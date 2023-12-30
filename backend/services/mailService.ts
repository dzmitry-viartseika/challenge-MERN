import * as nodemailer from 'nodemailer';
import {IMailService} from "../ts/interfaces/IMailService";

class MailService implements IMailService {
    transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            logger: true,
            debug: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
    }

    async sendActivationMail(to: string, link: string) {
         await this.transporter.sendMail({
            from: `"Contact Support" <${process.env.SMTP_USER}>`,
            to,
            subject: `Activation account ${link}`,
            text: 'Test text',
            html: `
        <div>
          <h1>For activation, you have to proceed the link</h1>
          <a href="${link}">${link}</a>
        </div>
      `,
        });
    }

    async sendForgotMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: `"Contact Support" <${process.env.SMTP_USER}>`,
            to,
            text: '',
            subject: 'Password reset link',
            html: `<h2>Please click on given link to reset password</h2>
                    <a href="${link}">${link}</a>`
        })
    }
}

export default new MailService();