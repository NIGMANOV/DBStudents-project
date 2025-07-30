import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendOtpEmail = async (email, otp) => {
  try {
    const subject = "Ваш код подтверждения";
    const text = `Ваш одноразовый код подтверждения: ${otp}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
        <h2 style="color: #333;">Подтверждение регистрации</h2>
        <p style="font-size: 16px;">Ваш код подтверждения:</p>
        <div style="font-size: 32px; font-weight: bold; margin: 16px 0; color: #2c3e50;">${otp}</div>
        <p style="font-size: 14px; color: #888;">Код действителен в течение 5 минут. Пожалуйста, не передавайте его другим лицам.</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"My App" <${process.env.MAIL_USER}>`,
      to: email,
      subject,
      text,
      html,
    });

    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Ошибка при отправке письма:", error);
  }
};
