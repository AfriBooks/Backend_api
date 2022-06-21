import nodemailer from "nodemailer";

export const resetMail = async (email: string, subject: string, text: string) =>{
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 587,
            secure: true,
            auth:{
                user: process.env.USER,
                pass: process.env.PASS,
            }
        })
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: 'Reset Your Password',
            text: `Hi, 
                   Please follow the link bellow to reset your Password,
                   If you did not initiate this, kindly ignore.
                   Thanks`
        })
        console.log('email sent successfully');
        
    } catch (error) {
        console.log(error, 'email failed');
        
    }
}