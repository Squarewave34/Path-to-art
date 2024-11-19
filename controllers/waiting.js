const Folder = require("../models/folder")

const show = async(req, res) => {
  const id = req.session.user._id
  const folder = await Folder.find({owner: id})

  res.render('waitingProjects/index.ejs', {folders: folder})
  console.log(folder);
}

const showNewFolder = (req, res) => {
  res.render('waitingProjects/new.ejs')
}

const makeNewFolder = async(req, res) => {
  try{
    req.body.owner = req.session.user._id;
    await Folder.create(req.body);
    res.redirect('/waitingProjects');
  }catch(error){
    console.log(error);
    res.redirect('/')
  }
}

module.exports = {
  show,
  showNewFolder,
  makeNewFolder,
}