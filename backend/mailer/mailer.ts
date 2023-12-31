import { Transporter, createTransport } from "nodemailer"
import {IEmailOptions} from "../ts/interfaces/IEmailOptions";
import loggerAdapter from "../logger/logger";

abstract class INodeMailerAdapter {
    abstract sendForgotMail(options: IEmailOptions): Promise<void>
    abstract sendActivationMail(to: string, link: string): Promise<void>
}


export class NodeMailerAdapter implements INodeMailerAdapter {
    private transporter: Transporter;

    constructor() {
        this.transporter = createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
    }

    async sendForgotMail(options: IEmailOptions): Promise<void> {
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            loggerAdapter.info(`Email sent: ${info.response} Response code: "200", response message: OK`);

        } catch (error) {
            loggerAdapter.error(`Error sending email failed. Response code: "500", response message: ${error}`);
            throw error;
        }
    }

    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `Activation link ${process.env.API_URL}`,
            text: '',
            html: `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }
}

const nodeMailerAdapter: INodeMailerAdapter = new NodeMailerAdapter();

export default nodeMailerAdapter;