const resend = require("../config/mailer");

exports.sendContactMessage = async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message
    } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const { data, error } = await resend.emails.send({
      from: "TechInCode <noreply@techincode.in>",

      to: [process.env.EMAIL_USER],

      replyTo: email,

      subject: `📩 Contact Form: ${subject}`,

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
            📩 New Contact Message
          </h2>

          <hr />

          <p>
            <strong>Name:</strong> ${name}
          </p>

          <p>
            <strong>Email:</strong> ${email}
          </p>

          <p>
            <strong>Subject:</strong> ${subject}
          </p>

          <hr />

          <h3>Message:</h3>

          <div style="
            background: #f9f9f9;
            padding: 15px;
            border-radius: 8px;
            line-height: 1.6;
          ">
            ${message}
          </div>

          <hr />

          <p style="color: #666; font-size: 12px;">
            This message was submitted through TechInCode.
          </p>

        </div>
      `
    });

    if (error) {
      console.error("Resend Contact Error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to send contact message"
      });
    }

    console.log("Contact Email Sent:", data);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully!"
    });

  } catch (error) {
    console.error("Contact Mail Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send contact message"
    });
  }
};
