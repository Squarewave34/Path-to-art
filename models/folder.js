const mongoose = require('mongoose')

const folderSchema = new mongoose.Schema({
  folderName:{
    type: String,
    required: true
  },
  colorCode:{
    type: String,
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
},{
  timestamps: true
})

const Folder = mongoose.model("Folder", folderSchema)

module.exports = Folder