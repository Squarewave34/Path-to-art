const bcrypt = require('bcrypt')
const User = require("../models/user")

const showSignUp = (req, res)=>{
  res.render("auth/sign-up.ejs")
}

const signUp = async (req, res) => {
  try{
    const userInDatabase = await User.findOne({username: req.body.username})
    if(userInDatabase){
      return res.send("Username already taken.")
    }
  
    if(req.body.password!=req.body.confirmPassword){
      return res.send("password and confirm password don't match")
    }
  
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword
  
    const user = await User.create(req.body)
    res.redirect('/')
  }catch(error){
    console.log(error);
    res.redirect('/')
  }
}

const showSignIn =  (req, res)=>{
  res.render('auth/sign-in.ejs')
}

const signIn = async(req, res)=>{
  try{
    const userInDatabase = await User.findOne({username: req.body.username})
    if(!userInDatabase){
      return res.send("Log in failed")
    }
  
    const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password)
    if (!validPassword){
      return res.send("Log in failed")
    }
    
    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id
    };
  
    res.redirect('/')
  }catch(error){
    console.log(error);
    res.redirect('/')
  }
}

const signOut = (req, res)=>{
  req.session.destroy();
  res.redirect("/");
}

module.exports = {
  showSignUp,
  signUp,
  showSignIn,
  signIn,
  signOut
}