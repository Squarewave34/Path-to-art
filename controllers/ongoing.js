const Folder = require("../models/folder")
const Project = require("../models/projects")

const op = "ongoingProjects"

const show = (req, res)=>{
  res.render('ongoingProjects/index.ejs')
}

module.exports = {
  show,
}