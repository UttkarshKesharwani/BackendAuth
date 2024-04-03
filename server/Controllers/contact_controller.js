const contactModel = require("../Models/contact_model");
const zodContact = require("../Validator/contact_validator");

const validateContactController = async (req, res, next) => {
  const response = req.body;
  const isValidMessage = zodContact.safeParse(response);
  console.log(isValidMessage.error);
  if (isValidMessage.success) {
    next();
  } else {
    return res.json({
      msg: isValidMessage.error.issues[0].message,
    });
  }
};
 
const contactController = async (req, res) => {
  const { username, email, message } = req.body;
  const AlreadySent  = await contactModel.findOne({ email: email });
  console.log(AlreadySent);
  if(AlreadySent){
    return res.json({
      msg:"You have already send an message"
    })
  }
  const messageSent = await contactModel.create({
    username: username,
    email: email, 
    message: message,
  });

  if (messageSent) {
    return res.json({
      msg: "Message Send Successfully",
      body: messageSent,
    });
  } else {
    return res.json({
      msg: "message has not been",
    });
  }
};

module.exports = { contactController, validateContactController };
