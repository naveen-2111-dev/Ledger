"use server";
import nodemailer from "nodemailer";

export default async function POST(req, res) {
  const { email, source } = req.body;

  if (!email || !source) {
    return res
      .status(400)
      .json({ message: "Email and image source are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "dev.naveen.rajan.m@gmail.com",
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: '"Sri Sairam College of Engineering" <Dept of cse>',
      to: email,
      subject: "Registration Successful",
      html: `
        <!-- emailTemplate.html -->
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #007BFF; padding: 20px; border-radius: 10px 10px 0 0; color: white; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Welcome to Sri Sairam College of Engineering!</h1>
          </div>
          <div style="padding: 20px; text-align: center;">
            <p style="font-size: 18px; color: #333; line-height: 1.6;">
              Your registration was successful! We're excited to have you join us.
            </p>
            <p style="font-size: 16px; color: #666; margin-top: 20px; line-height: 1.6;">
              If you have any questions, feel free to contact our coordinators.
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: "Registration Qr.png",
          path: source,
          cid: "welcomeImage",
        },
      ],
    });

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
}
