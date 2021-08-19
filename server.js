const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
const static = require('node-static')
dotenv.config();
const cors = require('cors');



// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
  });

var corsOptions = {
    origin: [process.env.ADDRESS1,process.env.ADDRESS2,process.env.ADDRESS3],
    optionsSuccessStatus: 200 // For legacy browser support
}
 app.use(cors(corsOptions)); 

// Data parsing
app.use(express.urlencoded({
    extended: false
}));

//middleware
app.use(express.json())
// app.use(express.static(__dirname + '/public'));

//send email
app.post('/', (req, res) => {
    console.log(req.body)
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 587,
        secure: true,
        auth: {
            user:process.env.USER,
            pass:process.env.PASSWORD
        },
        debug: true
    });

const mailOptions = {
    from: req.body.contactName,
    to: process.env.USER,
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message
}

transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
        console.log(error);
        res.send('error');
    }else {
        console.log('Email sent: ' + info.response);
        res.send('success')
    }
 })
});

// setup static file server
const fileServer = new(static.Server)('./public');
require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
}).listen(process.env.PORT, () => console.log(`server is running on Port ${process.env.PORT}`))