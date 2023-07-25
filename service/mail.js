const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

let transporter = nodemailer.createTransport({
  pool: true,
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
  tls: {
    rejectUnauthorized: false
  } 

});

const sendEmail = ( sujet,text,email, res) => {
  const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: sujet,
      html: "<!DOCTYPE html><html><head><style>body{justify-content: center;}div.centrer {margin: 0px 50px 0px 50px;justify-content: center;align-items: center;}div.adresse {line-height: 7px;text-align: center;color: gray;}</style></head><body>"+
      "<div class=`centrer`>"+text+"</div><div class=`adresse`><p><b>Andavamamba</b></p><p><b>Lot III X 12 Antananarivo</b></p><p><b>contact@garage.com</b></p><p><b>M1-P10-Léonard-Sambatra</b></p></div></div></body></html>"  
    };
  
    console.log(mailOptions) 
          transporter
            .sendMail(mailOptions)
            .then(() => {
              console.log("fini");
              res.json({
                status: "EN COURS"
              });
            })
            .catch((err) => {
              console.log(err); 
              // res.json({
              //   status: "ECHEC",
              //   message: "Erreur de hachage des données email!",
              // });
            });
  };

  module.exports = {
    sendEmail
}