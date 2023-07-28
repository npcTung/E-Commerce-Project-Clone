const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendMail = asyncHandler(async ({ email, html }) => {
  let transorter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
  let info = await transorter.sendMail({
    from: '"Cuahangdientu" <no-relply@cuahangdientu.com>', // sender address
    to: email, // list of receivers
    subject: "Forgot Password", // Subject line
    text: "Hello world?", // plain text body
    html: html, // html body
  });

  return info;
});

module.exports = sendMail;
