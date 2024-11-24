const Folder = require("../models/folder")
const Project = require("../models/projects")

const op = "ongoingProjects"

const show = async(req, res)=>{
  const projects = await Project.find({owner: req.session.user._id})
  res.render('ongoingProjects/index.ejs', {projects})
}

module.exports = {
  show,
}