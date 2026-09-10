const Certificate = require("../models/Certificate");

const cloudinary = require("../config/cloudinary");

const generateCertificateId = require(
  "../utils/generateCertificateId"
);

const generateCertificatePDF = require(
  "../utils/generateCertificatePDF"
);


const uploadPDFToCloudinary = (buffer, certificateId) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        public_id: `certificates/${certificateId}`,
        format: "pdf",
        overwrite: true,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary PDF Upload Error:", error);
          reject(error);
        } else {
          console.log("Cloudinary PDF Upload Success:", {
            secure_url: result.secure_url,
            url: result.url,
            format: result.format,
            resource_type: result.resource_type,
            bytes: result.bytes,
          });

          resolve(result);
        }
      }
    );

    uploadStream.end(buffer);
  });
};

// ==========================================
// CREATE CERTIFICATE
// ==========================================

exports.createCertificate = async (req, res) => {

  try {

    const {
      certificateType,
      recipientName,
      recipientEmail,
      role,
      domain,
      startDate,
      endDate,
      skills,
      projectsCompleted,
    } = req.body;


    // Validation

    if (
      !recipientName ||
      !recipientEmail ||
      !role ||
      !domain ||
      !startDate ||
      !endDate
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Please fill all required fields",

      });

    }


    // Generate Unique Certificate ID

    const certificateId =
      await generateCertificateId(
        certificateType
      );


    // Create database record

    const certificate =
      await Certificate.create({

        certificateId,

        certificateType:
          certificateType || "INTERNSHIP",

        recipientName,

        recipientEmail: recipientEmail.toLowerCase().trim(),

        role,

        domain,

        startDate,

        endDate,

        skills: skills || [],

        projectsCompleted:
          projectsCompleted || 0,

        verificationUrl:
          `${process.env.FRONTEND_URL}/verify/${certificateId}`,

      });


    // Generate PDF

    const pdfBuffer = await generateCertificatePDF(certificate);

console.log("Generated PDF Buffer Size:", pdfBuffer.length);

if (!pdfBuffer || pdfBuffer.length === 0) {
  throw new Error("PDF generation failed: Empty PDF buffer");
}


    // Upload PDF to Cloudinary

    const uploadResult = await uploadPDFToCloudinary(
  pdfBuffer,
  certificateId
);

console.log("PDF Cloudinary URL:", uploadResult.secure_url);

certificate.pdfUrl = uploadResult.secure_url;

await certificate.save();


    res.status(201).json({

      success: true,

      message:
        "Certificate generated successfully",

      certificate,

    });


  } catch (error) {

    console.error(
      "Certificate Creation Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Certificate generation failed",

      error: error.message,

    });

  }

};



// ==========================================
// VERIFY CERTIFICATE
// ==========================================

exports.verifyCertificate = async (
  req,
  res
) => {

  try {

    const certificateId =
      req.params.certificateId.toUpperCase();


    const certificate =
      await Certificate.findOne({

        certificateId,

      });


    if (!certificate) {

      return res.status(404).json({

        success: false,

        verified: false,

        message:
          "Certificate not found",

      });

    }


    if (certificate.status === "REVOKED") {

      return res.status(400).json({

        success: false,

        verified: false,

        message:
          "This certificate has been revoked",

      });

    }


    res.status(200).json({

      success: true,

      verified: true,

      message:
        "Certificate verified successfully",

      certificate: {

        certificateId:
          certificate.certificateId,

        recipientName:
          certificate.recipientName,

        role:
          certificate.role,

        domain:
          certificate.domain,

        startDate:
          certificate.startDate,

        endDate:
          certificate.endDate,

        issueDate:
          certificate.issueDate,

        issuedBy:
          certificate.issuedBy,

        pdfUrl:
          certificate.pdfUrl,

      },

    });


  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        "Verification failed",

    });

  }

};



// ==========================================
// GET ALL CERTIFICATES
// ==========================================

exports.getAllCertificates =
  async (req, res) => {

    try {

      const certificates =
        await Certificate.find()

          .sort({
            createdAt: -1,
          });


      res.status(200).json({

        success: true,

        certificates,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch certificates",

      });

    }

  };


// ==========================================
// GET CERTIFICATES BY EMAIL
// ==========================================

exports.getMyCertificates = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const certificates = await Certificate.find({
      recipientEmail: email.toLowerCase(),
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      certificates,
    });

  } catch (error) {

    console.error(
      "Fetch User Certificates Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch user certificates",
    });

  }
};
// ==========================================
// REVOKE CERTIFICATE
// ==========================================

exports.revokeCertificate =
  async (req, res) => {

    try {

      const certificate =
        await Certificate.findByIdAndUpdate(

          req.params.id,

          {
            status: "REVOKED",
          },

          {
            new: true,
          }

        );


      if (!certificate) {

        return res.status(404).json({

          success: false,

          message:
            "Certificate not found",

        });

      }


      res.status(200).json({

        success: true,

        message:
          "Certificate revoked successfully",

        certificate,

      });


    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          "Failed to revoke certificate",

      });

    }

  };