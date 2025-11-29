const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, fornece um email válido']
  },
  matricula: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true,
    min: [18, 'A idade deve ser no mínimo 18 anos'],
    max: 100
  },
  course: {
    type: String,
    required: true,
    enum: ['Engenharia', 'Administração', 'Sistemas', 'Marketing', 'Outros']
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Student', studentSchema);
