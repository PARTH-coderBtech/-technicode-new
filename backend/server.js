require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
connectDB();
const app = express();
// CORS configuration
const allowedOrigins = [
  "http://localhost:8080",
  "https://techincode.in"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked"));
    }
  }
}));
app.use(express.json());

const certificateRoutes = require("./routes/certificateRoutes");
const authRoutes = require('./routes/authRoutes');
const internshipRoutes = require('./routes/InternshipRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const contactRoutes = require('./routes/contactRoutes');

app.use('/api', authRoutes);
app.use(
  "/api",
  applicationRoutes
);
app.use('/api/apply', applicationRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/contact', contactRoutes);
app.use(
  "/api/certificates",
  certificateRoutes
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));