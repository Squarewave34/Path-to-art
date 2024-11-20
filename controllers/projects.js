const Folder = require("../models/folder")
const Project = require("../models/projects")

const wp = "waitingProjects"

const newProject = (req, res) => {
  res.render(`projects/new.ejs`)
}

const makeNewProject = async(req, res)=>{
  try{
    req.body.owner = req.session.user._id;
    req.body.completionPercentage = 0;
    req.body.completionStatus = false;

    await Project.create(req.body);
    res.send(`added`)
  }catch(error){
    console.log(error);
    res.redirect('/')
  }
}

module.exports = {
  newProject,
  makeNewProject
}