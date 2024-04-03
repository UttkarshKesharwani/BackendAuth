const User = require("../Models/user_models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const zodSchema = require("../Validator/auth_validation");
const nodemailer = require("nodemailer");
const path = require("path");

// exports.homeController = (req, res) => {
//   res.send("hey from router");
// };

// exports.registerController = (req, res) => {
//   res.send("hello from register routers");
// };

// exports.userController = (req, res) => {
//   res.send("hey from user router");
// };

// ! Get Register Data : Retrieve user data (username , email, password)
// ! check email existence : check if the email is already registerd
// ! Hash Password : Secure hash the password
// ! Create User : Create a new user with hashed password
// ! Save to db : save user data to the db
// ! Respond : Respond with "Registration Successful" or handle errors

homeController = (req, res) => {
  res.send("hey from router");
};

const validateController = async (req, res, next) => {
  try {
    const { email, phone, username } = req.body;
    const valid = zodSchema.safeParse({
      username: username,
      email: email,
      phone: phone,
    });
    console.log(valid.error);
    if (valid.success) {
      next();
    } else {
      return res.json({
        msg: valid.error.issues[0].message,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

registerController = async (req, res) => {
  const { username, email, phone, password, captcha } = req.body;
  console.log(captcha);

  const UserExist = await User.findOne({ email: email });

  if (UserExist) {
    return res.status(400).json({
      msg: "email already exist",
    });
  }
  // ! hashPassword
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username: username,
    email: email,
    phone: phone,
    password: hashPassword,
  });
  // console.log(newUser.error);
  await newUser.save();
  if (newUser.success) {
    console.log("detail sent succsefully");
  } else {
    console.log(newUser.error);
  }
  const { _id } = newUser;
  console.log(_id.toString());
  const token = jwt.sign(
    {
      userId: _id.toString(),
      email: email,
    }, 
    "thisIsJWTSignature",
    { expiresIn: "30d" }
  );

  return res.send({
    msg: "User Registered successfully",
    token: token,
  });
};

// ! login contoller:-

// ! checking whether the user is already registed or not
// ! If exist , then compare the password

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.json({
        msg: "Invalid Credentials",
      });
    }
    console.log(userExist);
    const isValidPassword = await bcrypt.compare(password, userExist.password);
    if (isValidPassword) {
      return res.status(200).json({
        msg: "login Successful",
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ msg: "invalid credentials" });
    }
  } catch (error) {
    console.log(error);
  }
};

const forgetPasswordContoller = async (req, res) => {
  const { email } = req.body;
  // console.log(email);
  const userExist = await User.findOne({ email });
  if (userExist) {
    const jwtSignature = "thisIsJWTSignature";
    const resetToken = jwt.sign(
      {
        userId: userExist._id.toString(),
        email: email,
      },
      jwtSignature,
      { expiresIn: "1d" }
    );
    console.log(resetToken);

    const link = `http://localhost:3000/api/resetPassword/${userExist._id}/${resetToken}`;
    console.log(link);

    // ! Sending a email
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
        http://localhost:5173/resetPassword/${userExist._id}/${resetToken};
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.json({
          msg: "Email sent Successfully",
        });
      }
    });
  } else {
    console.log("no user exist", userExist);
    return res.json({
      msg: "User not found",
    });
  }
};

const resetPasswordController = async (req, res) => {
  const { id, token } = req.params;
  console.log(id + "139");
  console.log(token);
  // console.log(req.params);

  // ! Now veryify the token and id given by the link is correct or not
  const userExist = await User.findOne({ _id: id });
  if (!userExist) {
    return res.json({
      msg: "User dont exist",
    });
  }
  try {
    const jwtSignature = "thisIsJWTSignature";
    const isVerifiedToken = jwt.verify(token, jwtSignature);
    return res.json({
      token: isVerifiedToken,
    });
  } catch (error) {
    console.log(error);
    return res.send("Not verified token");
  }
};

const finalResetPasswordController = async (req, res) => {
  // ! In HTTP POST requests, parameters are typically sent in the request body rather than in the URL path.
  // ! Therefore, you won't directly access parameters from req.params in a POST request as you would in a GET request.
  //! const { token, id } = req.params;

  const { newPassword, confirmPassword, token, id } = req.body;
  const jwtSignature = "thisIsJWTSignature";
  if (newPassword != confirmPassword) {
    return res.json({
      msg: "Password Doesn't Matches",
    });
  }
  const isVerifiedToken = jwt.verify(token, jwtSignature);
  // console.log(isVerifiedToken);
  const hashPassword = await bcrypt.hash(newPassword, 10);
  console.log(hashPassword);
  const validUser = await User.findByIdAndUpdate(
    { _id: id },
    { password: hashPassword }
  );
  console.log(validUser);
  res.json({
    msg: "hello from final reset password ",
  });
};

module.exports = {
  forgetPasswordContoller,
  homeController,
  registerController,
  loginController,
  validateController,
  resetPasswordController,
  finalResetPasswordController,
};
