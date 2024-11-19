const Folder = require("../models/folder")

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
    res.render(`${wp}/show.ejs`, {folder})
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
}