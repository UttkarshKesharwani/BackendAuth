const express = require("express");
const router = require("./Router/auth_router");
const routerContact = require('./Router/message_router');
const connectDb = require("./Utils/db");
const app = express();
const cors = require('cors')




// const dotenv = require('dotenv');
// dotenv.config()
// const  corsOptions  = {
//   origin: 'http://localhost:5173',
//   methods:"GET , POST , PUT , DELETE,PATCH,HEAD",
//   credential:true,
// }
app.use(cors({
  origin:'http://localhost:5173'
}));


app.use(express.json())
app.use("/api", router);
app.use("/api",routerContact);

// app.get("/", (req, res) => {
//    res.send("hii there");
// });

connectDb().then(()=>{
app.listen(3000)
})
