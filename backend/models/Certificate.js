const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    certificateId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    certificateType: {
      type: String,
      enum: ["INTERNSHIP", "EXPERIENCE", "PROJECT", "TRAINING"],
      default: "INTERNSHIP",
    },

    recipientName: {
      type: String,
      required: true,
      trim: true,
    },

    recipientEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
    },

    domain: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    issueDate: {
      type: Date,
      default: Date.now,
    },

    skills: [
      {
        type: String,
      },
    ],

    projectsCompleted: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "REVOKED"],
      default: "ACTIVE",
    },

    pdfUrl: {
      type: String,
      default: "",
    },

    verificationUrl: {
      type: String,
      default: "",
    },

    issuedBy: {
      type: String,
      default: "TechInCode",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Certificate",
  certificateSchema
);