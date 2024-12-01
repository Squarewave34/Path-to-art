const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  folderId:{
    type: mongoose.Schema.Types.ObjectId,
  },
  inspoBoard:{
    type: String,
  },
  refs:{
    type: mongoose.Schema.Types.ObjectId,
  },
  links:{
    type: String,
  },
  type:{
    type: String,
    required: true
  },
  completionPercentage:{
    type: Number,
    required: true
  },
  completionStatus:{
    type: Boolean,
    required: true
  },
  reminder:{
    type: Date,
  },
  deadline:{
    type: Date,
  },
  notes:{
    type: String
  },
  FinishedProduct:{
    type: mongoose.Schema.Types.ObjectId,
  },
  steps:{
    type: mongoose.Schema.Types.ObjectId,
  },
  stages:{
    type: [{name: String, done: Boolean}]
  },
  currentStage:{
    type: String,
    required: true
  },
  status:{
    type: String,
    required: true
  },important:{
    type: Boolean,
    required: true
  }
},{
  timestamps: true
})

const Project = mongoose.model("Project", projectSchema)

module.exports = Project