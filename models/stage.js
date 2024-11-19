const mongoose = require('mongoose')

const stageSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
},{
  timestamps: true
})

const Stage = mongoose.model("Stage", stageSchema)

module.exports = Stage