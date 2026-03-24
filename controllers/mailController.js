const transporter = require("../config/mailer");
const path = require("path");

exports.sendMailPage = (req, res) => {
  res.render("index", { message: null });
};


exports.sendMail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.render("index", { message: "Email is required!" });
    }

    console.log("Sending email to:", email);

    const SUBJECT = "Looking for Job opportunity";

    const MESSAGE = `Hello Sir/Mam,

I am writing to submit my application for a suitable position at your company. Please find my CV attached for your review. I would be grateful if you could consider my profile for opportunities that align with my skills and background.

Thank you for your time and consideration.

Sincerely,
Shivang Yadav
+91 9026282662`;

    const FILE_PATH = path.join(__dirname, "../fixed/shivang cv-1.pdf");

    const mailOptions = {
      from: `"Shivang Yadav" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: SUBJECT,
      text: MESSAGE,
      attachments: [
        {
          filename: "Shivang_CV.pdf",
          path: FILE_PATH,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    console.log("Bhej diya malik :", email);

    res.render("index", { message: "Email sent successfully!" });

  } catch (error) {
    console.error("Galti ho gaya malik :", error.message);

    res.render("index", {
      message: "Error sending email: " + error.message,
    });
  }
};