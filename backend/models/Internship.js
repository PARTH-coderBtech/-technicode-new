const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    paymentType: {
  type: String,
  enum: ["Paid", "Unpaid"],
  required: true,
  default: "Unpaid"
},

stipend: {
  type: String,
  default: ""
},

    description: {
      type: String,
      required: true,
      trim: true
    },

    fullDescription: {
      type: String,
      default: ""
    },

    category: {
      type: String,
      required: true
    },

    type: {
      type: String,
      required: true,
      enum: ["Tech", "Non-Tech"]
    },

    duration: {
      type: String,
      required: true
    },

    location: {
      type: String,
      default: "Remote"
    },

    stipend: {
      type: String,
      default: "Not Disclosed"
    },

    openings: {
      type: String,
      default: "Multiple"
    },

    responsibilities: {
      type: [String],
      default: []
    },

    skills: {
      type: [String],
      default: []
    },

    whoCanApply: {
      type: [String],
      default: []
    },

    learning: {
      type: [String],
      default: []
    },

    perks: {
      type: [String],
      default: []
    },

    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open"
    }
  },
  {
    timestamps: true
  }
);

const Internship = mongoose.model(
  "Internship",
  internshipSchema
);

module.exports = Internship;