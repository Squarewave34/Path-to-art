const session = require("express-session")
const Folder = require("../models/folder")
const Project = require("../models/projects")

const wp = "waitingProjects"

// only waiting
const newProject = (req, res) => {
  res.render(`projects/new.ejs`, {folder: req.params.folderId})
}

const makeNewProject = async(req, res)=>{
  try{
    req.body.owner = req.session.user._id;
    req.body.completionPercentage = 0;
    req.body.completionStatus = false;
    req.body.folderId = req.params.folderId;
    req.body.status = "waiting";
    req.body.important = false;
    req.body.stages = [{name: "sketch", done: false}, {name: "lineart", done: false}, {name: "base color", done: false}, {name: "shading", done: false}]
    req.body.currentStage = req.body.stages[0].name
    
    await Project.create(req.body);
    res.redirect(`/${wp}/${req.params.folderId}`)
  }catch(error){
    console.log(error);
    res.redirect('/')
  }
}

// change status
const toOngoing = async(req, res)=>{
  try{
    req.body.status = "ongoing"
    const project = await Project.findById(req.params.projectId)

    if(project.owner.equals(req.session.user._id)){
      await project.updateOne(req.body)
      res.redirect(`/ongoingProjects`)
    }else{
      res.send("you can't edit a project that isn't yours")
    }
  }catch(error){
    console.log(error);
    res.redirect('/')
  }
}

const toCompleted = async(req, res)=>{
  try{
    req.body.status = "completed"
    const project = await Project.findById(req.params.projectId)

    if(project.owner.equals(req.session.user._id)){
      await project.updateOne(req.body)
      console.log(req.body, project);
      res.redirect(`/completedProjects`)
    }else{
      res.send("you can't edit a project that isn't yours")
    }
  }catch(error){
    console.log(error);
    res.redirect('/')
  }
}

const toWaiting = async(req, res)=>{
  try{
    req.body.status = "waiting"
    const project = await Project.findById(req.params.projectId)
    const folder = await Folder.findOne({_id: project.folderId})

    if(project.owner.equals(req.session.user._id)){
      if(!folder){
        res.send("you can't restart this task because it's folder doesn't exist")
      }else{
        await project.updateOne(req.body)
        console.log(req.body, project);
        res.redirect(`/waitingProjects/${project.folderId}`)
      }
    }else{
      res.send("you can't edit a project that isn't yours")
    }
  }catch(error){
    console.log(error);
    res.redirect('/')
  }
}

// multi
const showProject = async(req, res)=>{
  try{
    const project = await Project.findById(req.params.projectId)

    if(project.status==="waiting"){
      const folder = req.params.folderId
      res.render(`projects/show.ejs`, {project, folder})
    }
    else if(project.status==="ongoing" || project.status==="completed"){
      res.render(`projects/show.ejs`, {project})
    }
  }catch(error){
    console.log(error);
    res.redirect('/')
  }
}

const editProject = async(req, res)=>{
  try{
    const project = await Project.findById(req.params.projectId)
    if(project.status==="waiting"){
      const folder = req.params.folderId
      res.render(`projects/edit.ejs`, {project, folder})
    }
    else if(project.status==="ongoing" || project.status==="completed"){
      res.render(`projects/edit.ejs`, {project})
    }
  }catch(error){
    console.log(error);
    res.redirect('/')
  }
}

const submitEditedProject = async(req, res)=>{
  try{
    const project = await Project.findById(req.params.projectId)

    if(project.owner.equals(req.session.user._id)){
      if(project.status==="waiting"){
        await project.updateOne(req.body)
        res.redirect(`/${wp}/show/${req.params.folderId}/project/${req.params.projectId}`)
      }else if(project.status==="ongoing"){
        await project.updateOne(req.body)
        res.redirect(`/ongoingProjects/project/${req.params.projectId}`)
      }

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
      if(project.status==="waiting"){
        res.redirect(`/${wp}/${req.params.folderId}`)
      }else if(project.status==="ongoing"){
        res.redirect(`/ongoingProjects`)
      }else if(project.status==="completed"){
        res.redirect(`/completedProjects`)
      }

    }else{
      res.send("you can't delete a project that isn't yours")
    }
  }catch(error){
    console.log(error);
    res.redirect('/')
  }
}

const important = async(req, res)=>{
  try{
    const project = await Project.findById(req.params.projectId)
    req.body.important=!project.important

    if(project.owner.equals(req.session.user._id)){
      await project.updateOne(req.body)
      res.redirect(`/importantProjects`)
    }else{
      res.send("you can't edit a project that isn't yours")
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
  deleteProject,
  toOngoing,
  toCompleted,
  toWaiting,
  important,
}