const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Sabse upar apna admin email fix kar dein
const ADMIN_EMAIL = "krishk99973@gmail.com"; 

exports.getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });

  }
};
// --- SIGNUP ---
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validation: Agar data missing hai toh 400 error bhejega
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already registered with this email" });
    }

    // 3. Password hash karein
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 4. User create karein
    const newUser = await User.create({ name, email, password: hashedPassword });

    // 5. Signup ke baad turant Token generate karein (Taki user seedha login ho jaye)
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    
    res.status(201).json({ 
      success: true, 
      token, // Token bhejiyo warna frontend error dega
      user: { 
        name: newUser.name, 
        email: newUser.email,
        isAdmin: newUser.email === ADMIN_EMAIL 
      } 
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong during signup" });
  }
};

// --- LOGIN ---
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }
    
    // 2. User ko dhundein
    const user = await User.findOne({ email });
    
    if (user && (await bcrypt.compare(password, user.password))) {
      // 3. JWT Token generate karein
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
      
      // 4. Admin check
      const isAdmin = user.email === ADMIN_EMAIL;

      res.json({ 
        success: true, 
        token, 
        user: { 
          name: user.name, 
          email: user.email, 
          isAdmin: isAdmin 
        } 
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
};