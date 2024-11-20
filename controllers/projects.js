const session = require("express-session")
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

const showProject = async(req, res)=>{
  try{
    const project = await Project.findById(req.params.projectId)
    res.render(`projects/show.ejs`, {project})
  }catch(error){
    console.log(error);
    res.redirect('/')
  }
}

const editProject = async(req, res)=>{
  try{
    const project = await Project.findById(req.params.projectId)
    res.render(`projects/edit.ejs`, {project})
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
      res.redirect(`/${wp}`)
    }else{
      res.send("you can't delete a project that isn't yours")
    }
  }catch(error){
    console.log(error);
    res.redirect('/')
  }}

module.exports = {
  newProject,
  makeNewProject,
  showProject,
  editProject,
  submitEditedProject,
  deleteProject
}