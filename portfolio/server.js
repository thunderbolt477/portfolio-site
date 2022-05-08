require('dotenv').config()
const { text } = require("express");
const express = require("express");
const app = express();
const nodemailer = require("nodemailer");


const PORT = process.env.PORT || 3000;


//Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json())



app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/index.html")
})


app.get("/contact", (req, res) => {
    res.sendFile(__dirname + "/public/contactform.html");
})


app.post('/', (req, res) => {
    

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL,
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) =>{
        if (error){
            console.log(error);
            res.send('error');
        } else {
            console.log("Email sent: "+ info.response);
            res.send("success");
        }
    })
})

app.listen(PORT, () =>{
    console.log(`Sever running on ${PORT}`)
})