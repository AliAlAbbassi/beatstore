/* Amplify Params - DO NOT EDIT
  ENV
  REGION
Amplify Params - DO NOT EDIT */

var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const fileupload = require('express-fileupload')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')

// Load env vars
dotenv.config({ path: './config/config.env' })

// Route files
const auth = require('./routes/auth')
const users = require('./routes/users')
const beats = require('./routes/beats')

// declare a new express app
const app = express()

// Body parser
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(awsServerlessExpressMiddleware.eventContext())

// Connect to db
connectDB()


// Enable CORS for all methods
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   next()
// });

// Cookie parser
app.use(cookieParser())

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// File uploading
app.use(fileupload({ createParentPath: true }))

// Cors thing
app.use(cors())

// Sanitize data
app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10mins
  max: 100,
})

app.use(limiter)

// Prevent http param pollution
app.use(hpp())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Mount routers
app.use('/beatstore/api/auth', auth)
app.use('/beatstore/api/users', users)
app.use('/beatstore/api/beats', beats)

app.use(errorHandler)


/**********************
 * Example get method *
 **********************/

// app.get('/beatstore-api', function (req, res) {
//   // Add your code here
//   res.json({ success: 'get call succeed!', url: req.url });
// });

// app.get('/beatstore-api/*', function (req, res) {
//   // Add your code here
//   res.json({ success: 'get call succeed!', url: req.url });
// });


const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, Promise) => {
  console.log(`Error: ${err.message}`.red)
  server.close(() => process.exit(1))
})

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
