const mongoose = require('mongoose');

const contactSchema ={
  username:{
    type : String,
    required : true,
  },
  email:{
    type:String,
    required:true,
  },
  message:{
    type:String,
    required :true,
  }
}



const contactModel = mongoose.model("Contact",contactSchema);

module.exports = contactModel;