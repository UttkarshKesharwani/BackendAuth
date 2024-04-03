const express = require("express");
const app = express()
const router = express.Router();
// const cors = require('cors')

const {
  homeController,
  registerController,
  loginController,
  validateController,
  forgetPasswordContoller,
  resetPasswordController,
  finalResetPasswordController
} = require("../Controllers/auth_controllers");





router.get("/", homeController);
router.post("/register",validateController, registerController);

router.route("/login").post(loginController);
router.post("/forgetPassword",forgetPasswordContoller)
router.get("/resetPassword/:id/:token",resetPasswordController)
router.post("/resetPassword/:id/:token",finalResetPasswordController)

module.exports = router;
