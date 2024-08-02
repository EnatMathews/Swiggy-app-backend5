const mongoose = require('mongoose'); // Import mongoose

// Define Admin schema
const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create Admin model
const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;