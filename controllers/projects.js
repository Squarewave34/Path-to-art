const Folder = require("../models/folder")

const newProject = async(req, res) => {
  res.render(`projects/new.ejs`)
}

module.exports = {
  newProject
}