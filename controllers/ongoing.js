const Folder = require("../models/folder")
const Project = require("../models/projects")
const Image = require("../models/image")

const show = async(req, res)=>{
  const projects = await Project.find({owner: req.session.user._id})
  res.render('ongoingProjects/index.ejs', {projects})
}

const test = async(req, res)=>{
  try{
    const newImage = new Image({
      name: req.file.originalname,
      image: {
        data: req.file.path,
        contentType: req.file.mimetype,
      },
    });

    await newImage.save();

    const images = await Image.find();
    console.log(images);
    res.render("test.ejs", { images });
  }catch(error){
    console.log(error);
    res.redirect('/')
  }
}

module.exports = {
  show,
  test
}