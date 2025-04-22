import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })

  async sendClientAccepted(to: string, clientName: string) {
    try {
      await this.transporter.sendMail({
        from: `"CRM OSLogistics" <${process.env.MAIL_USER}>`,
        to,
        subject: `Klient zaakceptowany: ${clientName}`,
        text: `Informujemy, że klient "${clientName}" został zaakceptowany i przeniesiony do CRM.`,
      })
    } catch (err) {
      // 🧠 jeśli chcesz: możesz dodać tu log do pliku albo zewnętrzny monitoring
    }
  }
}
