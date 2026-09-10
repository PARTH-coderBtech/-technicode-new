const Counter = require("../models/Counter");

const generateCertificateId = async (type = "INTERNSHIP") => {
  const year = new Date().getFullYear();

  const prefixMap = {
    INTERNSHIP: "INT",
    EXPERIENCE: "EXP",
    PROJECT: "PRJ",
    TRAINING: "TRN",
  };

  const prefix = prefixMap[type] || "INT";

  const counter = await Counter.findOneAndUpdate(
    {
      name: `${type}-${year}`,
    },
    {
      $inc: {
        sequence: 1,
      },
    },
    {
      new: true,
      upsert: true,
    }
  );

  const serial = String(counter.sequence).padStart(6, "0");

  return `TIC-${prefix}-${year}-${serial}`;
};

module.exports = generateCertificateId;