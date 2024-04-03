const nodemailer = require('nodemailer')

const sendEmail = async (email,resetToken) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nikhilkesharwani9794@gmail.com",
      pass: "efxq djup drev zqes",
    },
  });

  var mailOptions = {
    from: "nikhilkesharwani9794@gmail.com",
    to: email,
    subject: "Sending Email using Node.js",
    html: `
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="http://localhost:5173/resetPassword?token=${resetToken}">Reset Password</a>
    `,
  };

   await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info.response);
      return res.json({
        msg: "Email sent Successfully",
      });
    }
  });
};

module.exports = sendEmail;
