const resend = require("../config/mailer");

exports.applyInternship = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      college,
      internship
    } = req.body;

    // Validation
    if (!fullName || !email || !phone || !college || !internship) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const { data, error } = await resend.emails.send({
      from: "TechInCode <noreply@techincode.in>",

      to: [process.env.EMAIL_USER],

      replyTo: email,

      subject: `🚀 New Internship Application: ${internship}`,

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: auto;
          padding: 25px;
          border: 1px solid #6d28d9;
          border-radius: 10px;
        ">
        
          <h2 style="color: #6d28d9;">
            🚀 New Internship Application
          </h2>

          <hr />

          <p>
            <strong>Name:</strong> ${fullName}
          </p>

          <p>
            <strong>Email:</strong> ${email}
          </p>

          <p>
            <strong>Phone:</strong> ${phone}
          </p>

          <p>
            <strong>College:</strong> ${college}
          </p>

          <p>
            <strong>Internship:</strong> ${internship}
          </p>

          <hr />

          <p style="color: #666; font-size: 12px;">
            This application was submitted through TechInCode.
          </p>

        </div>
      `
    });

    if (error) {
      console.error("Resend Application Error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to send application email"
      });
    }


    return res.status(200).json({
      success: true,
      message: "Application submitted successfully!",
      application: req.application,
    });

  } catch (error) {
   

    return res.status(500).json({
      success: false,
      message:
        "Application saved but email could not be sent",
    });
  }
};
