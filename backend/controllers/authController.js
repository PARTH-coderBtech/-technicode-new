const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = "krishk99973@gmail.com"; 
exports.resetPassword = async (req, res) => {
  
  try {
    const {
      email,
      otp,
      newPassword
    } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Email, OTP and new password are required"
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters"
      });
    }

    const user = await User.findOne({
      email,
      resetPasswordOTP: otp,
      resetPasswordOTPExpire: {
        $gt: Date.now()
      }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP"
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    user.password = hashedPassword;

    // Delete OTP after successful reset
    user.resetPasswordOTP = null;
    user.resetPasswordOTPExpire = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully"
    });

  } catch (error) {
    console.error("Reset password error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to reset password"
    });
  }
};
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email"
      });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    // OTP expires after 10 minutes
    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpire =
      Date.now() + 10 * 60 * 1000;

    await user.save();

    await resend.emails.send({
      from: "TechInCode <noreply@techincode.in>",
      to: email,
      subject: "TechInCode - Password Reset OTP",
      html: `
        <div style="font-family: Arial; max-width: 600px; margin: auto;">

          <h2 style="color:#071B2A;">
            TechInCode EduTech
          </h2>

          <p>
            You requested to reset your password.
          </p>

          <p>
            Your password reset OTP is:
          </p>

          <div style="
            background:#f3f4f6;
            padding:20px;
            text-align:center;
            border-radius:10px;
            font-size:32px;
            font-weight:bold;
            letter-spacing:8px;
          ">
            ${otp}
          </div>

          <p>
            This OTP will expire in <b>10 minutes</b>.
          </p>

          <p>
            If you did not request this password reset,
            you can safely ignore this email.
          </p>

          <br/>

          <p>
            Regards,<br/>
            <b>TechInCode EduTech</b>
          </p>

        </div>
      `
    });

    res.status(200).json({
      success: true,
      message: "OTP sent successfully"
    });

  } catch (error) {
    console.error("Forgot password error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send OTP"
    });
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const userId = req.user.id;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        name: name.trim(),
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin || false,
      },
    });
  } catch (error) {
    console.error(
      "Update Profile Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};
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