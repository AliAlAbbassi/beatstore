const nodemailer = require('nodemailer')

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (options) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMPT_EMAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  })

  // send mail with defined transport object
  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message,
  }

  const info = await transporter.sendMail(message)

  console.log('Message sent: %s', info.messageId)
}

module.exports = sendEmail
