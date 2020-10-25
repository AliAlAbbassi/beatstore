const aws = require('aws-sdk')
aws.config.loadFromPath('../.aws/config.json')

const sendEmail = (options) => {
  const sender = `Sender Name ${options.senderEmail}`
  const recipient = options.emailRequired
  const body_text = options.messageRequired
  const body_html = options.html
  //   const configuration_set = "ConfigSet"

  const charset = 'UTF-8'

  const ses = new aws.SES()

  var params = {
    Source: sender,
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: charset,
      },
      Body: {
        Text: {
          Data: body_text,
          Charset: charset,
        },
        Html: {
          Data: body_html,
          Charset: charset,
        },
      },
    },
  }
  ses.sendEmail(params, function (err, data) {
    // If something goes wrong, print an error message.
    if (err) {
      console.log(err.message)
    } else {
      console.log('Email sent! Message ID: ', data.MessageId)
    }
  })
}
module.exports = sendEmail
