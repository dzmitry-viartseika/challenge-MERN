import nodemailer from "nodemailer"

abstract class INodeMailerAdapter {
    abstract endEmail(options: IEmailOptions): Promise<void>
}
interface IEmailOptions {
    to: string;
    subject: string;
    text: string;
    html?: string;
}

export class NodeMailerAdapter implements INodeMailerAdapter {
    private transporter: nodemailer.Transporter;

    constructor() {
        super();
        this.transporter = nodemailer.createTransport({
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

    async sendEmail(options: IEmailOptions): Promise<void> {
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
}

const nodeMailerAdapter: INodeMailerAdapter = new NodeMailerAdapter();

export default nodeMailerAdapter;