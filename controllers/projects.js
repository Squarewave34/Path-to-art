const session = require("express-session")
const Folder = require("../models/folder")
const Project = require("../models/projects")

const wp = "waitingProjects"

const newProject = (req, res) => {
  res.render(`projects/new.ejs`, {folder: req.params.folderId})
}

const makeNewProject = async(req, res)=>{
  try{
    req.body.owner = req.session.user._id;
    req.body.completionPercentage = 0;
    req.body.completionStatus = false;
    req.body.folderId = req.params.folderId

    await Project.create(req.body);
    res.redirect(`/${wp}/${req.params.folderId}`)
  }catch(error){
    console.log(error);
    res.redirect('/')
  }
}

const showProject = async(req, res)=>{
  try{
    const project = await Project.findById(req.params.projectId)
    const folder = req.params.folderId
    res.render(`projects/show.ejs`, {project, folder})
  }catch(error){
    console.log(error);
    res.redirect('/')
  }
}

const editProject = async(req, res)=>{
  try{
    const folder = req.params.folderId
    const project = await Project.findById(req.params.projectId)
    res.render(`projects/edit.ejs`, {project, folder})
  }catch(error){
    console.log(error);
    res.redirect('/')
  }
}

const submitEditedProject = async(req, res)=>{
  try{
    const project = await Project.findById(req.params.projectId)

    if(project.owner.equals(req.session.user._id)){
      await Project.updateOne(req.body)
      res.redirect(`/${wp}/projects/${project._id}`)
    }else{
      res.send("you can't edit a project that isn't yours")
    }
  }catch(error){
    console.log(error);
    res.redirect('/')
  }
}

const deleteProject = async(req, res)=>{
  try{
    const project = await Project.findById(req.params.projectId)

    if(project.owner.equals(req.session.user._id)){
      await project.deleteOne();
      res.redirect(`/${wp}/${req.params.folderId}`)
    }else{
      res.send("you can't delete a project that isn't yours")
    }
  }catch(error){
    console.log(error);
    res.redirect('/')
  }
}

module.exports = {
  newProject,
  makeNewProject,
  showProject,
  editProject,
  submitEditedProject,
  deleteProject
}