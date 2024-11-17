const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const session = require('express-session')

const port = process.env.PORT ? process.env.PORT: "3000"

const authController = require("./controllers/auth.js");
const isSignedIn = require('./middleware/is-signed-in.js')
const passUserToView = require('./middleware/pass-user-to-view')


mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connection", ()=>{
  console.log(`connected to MongoDB ${mongoose.connection.name}`);
})

app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))
app.use(morgan('dev'))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

app.use(passUserToView)

app.use("/auth", authController);

app.use((req, res, next) =>{
  if(req.session.message){
    res.locals.message = req.session.message
    req.session.message=null
  }else{
    res.locals.message=null
  }
  next()
})

app.get("/", (req, res) => {
  res.render("index.ejs", {
    user: req.session.user,
  });
});

app.listen(port, ()=>{
  console.log(`the express app is ready on port ${port}`);
})