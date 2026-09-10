const Application = require("../models/Application");

exports.createApplication = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phone,
      college,
      internship,
    } = req.body;

    // Validation
    if (
      !fullName ||
      !email ||
      !phone ||
      !college ||
      !internship
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Check duplicate
    const existingApplication = await Application.findOne({
      email: email.toLowerCase().trim(),
      internship: internship.trim(),
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message:
          "You have already applied for this internship",
      });
    }

    // Save in MongoDB
    const application = await Application.create({
      fullName,
      email: email.toLowerCase().trim(),
      phone,
      college,
      internship,
      status: "Pending",
    });

    console.log(
      "Application saved successfully:",
      application._id
    );

    // Pass saved application to next controller
    req.application = application;

    // Move to email controller
    next();

  } catch (error) {

    console.error(
      "Application Creation Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to submit application",
    });

  }
};



// =====================================
// GET ALL APPLICATIONS
// ADMIN
// =====================================

exports.getAllApplications = async (req, res) => {

  try {

    const applications =
      await Application.find()
        .sort({ createdAt: -1 });


    res.status(200).json({

      success: true,

      applications,

    });


  } catch (error) {

    console.error(error);


    res.status(500).json({

      success: false,

      message:
        "Failed to fetch applications",

    });

  }

};



// =====================================
// GET USER APPLICATIONS
// DASHBOARD
// =====================================

exports.getMyApplications = async (req, res) => {

  try {

    const { email } = req.query;


    if (!email) {

      return res.status(400).json({

        success: false,

        message: "Email is required",

      });

    }


    const applications =
      await Application.find({

        email: email.toLowerCase().trim(),

      })
        .sort({ createdAt: -1 });


    res.status(200).json({

      success: true,

      applications,

    });


  } catch (error) {

    console.error(
      "Get My Applications Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Failed to fetch applications",

    });

  }

};



// =====================================
// GET ACTIVE INTERNSHIPS
// =====================================

exports.getActiveInternships = async (req, res) => {

  try {

    const { email } = req.query;


    if (!email) {

      return res.status(400).json({

        success: false,

        message: "Email is required",

      });

    }


    const applications =
      await Application.find({

        email: email.toLowerCase().trim(),

        status: {

          $in: [
            "Accepted",
            "Active",
          ],

        },

      })
        .sort({ createdAt: -1 });


    res.status(200).json({

      success: true,

      internships: applications,

    });


  } catch (error) {

    console.error(
      "Get Active Internships Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Failed to fetch active internships",

    });

  }

};



// =====================================
// UPDATE APPLICATION STATUS
// ADMIN
// =====================================

exports.updateApplicationStatus =
  async (req, res) => {

    try {

      const { status } = req.body;


      const allowedStatus = [

        "Pending",

        "Accepted",

        "Rejected",

        "Active",

        "Completed",

      ];


      if (!allowedStatus.includes(status)) {

        return res.status(400).json({

          success: false,

          message: "Invalid status",

        });

      }


      const application =
        await Application.findByIdAndUpdate(

          req.params.id,

          {
            status,
          },

          {
            new: true,
          }

        );


      if (!application) {

        return res.status(404).json({

          success: false,

          message:
            "Application not found",

        });

      }


      res.status(200).json({

        success: true,

        message:
          "Application status updated",

        application,

      });


    } catch (error) {

      console.error(
        "Update Application Error:",
        error
      );


      res.status(500).json({

        success: false,

        message:
          "Failed to update application",

      });

    }

  };