const mongoose = require('mongoose')

const stepsSchema = new mongoose.Schema({
  stepDesc:{
    type: String,
  },
  completionStatus:{
    type: Boolean,
    required: true
  }
},{
  timestamps: true
})

const Steps = mongoose.model("Steps", stepsSchema)

module.exports = Steps