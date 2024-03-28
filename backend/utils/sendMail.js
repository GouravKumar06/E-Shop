const nodemailer = require('nodemailer');

const mailSender = async (email, subject, text) => {
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        })

        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: `${email}`,
            subject: `${subject}`,
            text: `${text}`
        })

        return info

    }catch(error){
        console.log(error.message);
        console.log("error in mail sender");``
    }
}

module.exports = mailSender





