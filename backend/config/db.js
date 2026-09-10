const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Debugging ke liye: Check karein URI mil rahi hai ya nahi
    const uri = process.env.MOONGO_URI;
    
    if (!uri) {
      throw new Error("MONGO_URI is not defined in .env file");
    }

    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ Mongo Connection Error:", err.message);
    process.exit(1); // Server ko stop kar do agar DB connect na ho
  }
};

module.exports = connectDB;