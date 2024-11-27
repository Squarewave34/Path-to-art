const Folder = require("../models/folder")
const Project = require("../models/projects")

const wp = "waitingProjects"

const show = async(req, res) => {
  const id = req.session.user._id
  const folder = await Folder.find({owner: id})

  res.render(`${wp}/index.ejs`, {folders: folder})
}

const showNewFolder = (req, res) => {
  res.render(`${wp}/new.ejs`)
}

const makeNewFolder = async(req, res) => {
  try{
    req.body.owner = req.session.user._id;
    await Folder.create(req.body);
    res.redirect(`/${wp}`);
  }catch(error){
    console.log(error);
    res.redirect('/')
  }
}

const showFolder = async(req, res) => {
  try{
    const folder = await Folder.findById(req.params.folderId)
    const projects = await Project.find({folderId: req.params.folderId})
    res.render(`${wp}/show.ejs`, {folder, projects})
  }catch(error){
    console.log(error);
    res.redirect('/')
  }
}

const editFolder = async(req, res) => {
  try{
    const folder = await Folder.findById(req.params.folderId)
    res.render(`${wp}/edit.ejs`, {folder})
  }catch(error){
    console.log(error);
    res.redirect('/')
  }
}

const submitEditedFolder = async(req, res)=>{
  try{
    const folder = await Folder.findById(req.params.folderId)
    
    if(folder.owner.equals(req.session.user._id)){
      await folder.updateOne(req.body)
      res.redirect(`/${wp}/${req.params.folderId}`)
    }else{
      res.send("you can't edit a folder that isn't yours")
    }
  }catch(error){
    console.log(error);
    res.redirect('/')
  }
}

const deleteFolder = async(req, res)=>{
  try{
    const folder = await Folder.findById(req.params.folderId)

    if(folder.owner.equals(req.session.user._id)){
      await folder.deleteOne()
      await Project.deleteMany({folderId: req.params.folderId, owner: req.session.user._id, status:"waiting", status:"ongoing"})
      res.redirect(`/${wp}`)
    }else{
      res.send("you can't delete a list that isn't yours")
    }

  }catch(error){
    console.log(error);
    res.redirect('/')
  }
}

module.exports = {
  show,
  showNewFolder,
  makeNewFolder,
  showFolder,
  editFolder,
  submitEditedFolder,
  deleteFolder,
}