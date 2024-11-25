const Folder = require("../models/folder")
const Project = require("../models/projects")

const show = async(req, res)=>{
  const projects = await Project.find({owner: req.session.user._id})
  res.render('importantProjects/index.ejs', {projects})
}

module.exports = {
  show,
}