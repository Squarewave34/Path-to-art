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
  inspoBoard:{
    type: String,
  },
  refs:{
    type: String,
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
    type: String
  },
  steps:{
    type: mongoose.Schema.Types.ObjectId,
  },
  stage:{
    type: mongoose.Schema.Types.ObjectId,
  },
},{
  timestamps: true
})

const Project = mongoose.model("Project", projectSchema)

module.exports = Project