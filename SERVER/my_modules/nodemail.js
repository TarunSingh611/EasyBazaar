"use strict";
const nodemailer = require("nodemailer");

module.exports = async function(email, mail, callback) {
  try {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <thakurtarun936@gmail.com>',
      to: email,
      subject: "Hello ✔",
      text: "Hello world?",
      html: mail,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
    // if a callback function is provided, call it with no error and the info object
    if (callback) {
      callback(null, info);
    }
  } catch (error) {
    // if a callback function is provided, call it with the error
    if (callback) {
      callback(error);
    } else {
      console.error(error);
    }
  }
};
