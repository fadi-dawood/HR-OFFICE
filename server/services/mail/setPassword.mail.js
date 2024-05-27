import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { generateJWT } from "../middleware/authMiddleware.js";


export const setPasswordMail = async (employee) => {

    const transporter = nodemailer.createTransport({
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    try {
        // Creazte the token JWT
        const token = await generateJWT({ id: employee._id });

        // Create the link to set the password
        const setPasswordUrl = `${process.env.URL_FRONT}/setpassword/${token}`;

        // create the messegge mail
        const mailOptions = {
            from: process.env.MAILER_HOST,
            to: employee.personal_mail,
            subject: 'Set Your Password',
            text: `Please set your password by clicking the following link: ${setPasswordUrl}`,
            html: `<p>Please set your password by clicking the following link: <a href="${setPasswordUrl}">Set Password</a></p>`
        };

        // send the mail
        await transporter.sendMail(mailOptions);

        console.log('Set password email sent successfully');
    } catch (err) {
        console.error('Error sending set password email:', err);
        throw new Error('Error sending set password email');
    }
};

