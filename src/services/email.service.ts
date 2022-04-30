import nodemailer from "nodemailer";

export default class EmailService {
    private transporter: nodemailer.Transporter;
    testAccount: nodemailer.TestAccount;

    public async sendEmail(email: string, subject: string, text: string) {
        if(this.testAccount == undefined){
            this.testAccount = await nodemailer.createTestAccount();
        }

        if(this.transporter == undefined){
            this.transporter = nodemailer.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false,
                    auth: {
                        user: this.testAccount.user, // generated ethereal user
                        pass: this.testAccount.pass, // generated ethereal password
                    },
                });
        }
        const mailOptions: nodemailer.SendMailOptions = {};
        mailOptions.to = email;
        mailOptions.from = "stackerflow@stackerflow.com"
        mailOptions.subject = subject;
        mailOptions.text = text;
        mailOptions.html = text;

        await this.transporter.sendMail(mailOptions, (error: any, info: any) => {
            if (error) {
                return console.log(error);
            }
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        });
    }
}

