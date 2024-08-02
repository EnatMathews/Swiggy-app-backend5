const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Admin = require("./modules/Admin");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect("mongodb+srv://Enat:EnatVibin@cluster0.ts1wpg0.mongodb.net/swiggyDb?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));
  
  // @route   POST /admin-signUp
  // @desc    Register new admin
  // @access  Public
  app.post('/admin-signUp', async (req, res) => {
    const { name, username, password } = req.body;
  
    try {
      // Check if admin already exists
      let admin = await Admin.findOne({ username });
      if (admin) {
        return res.status(400).json({ msg: 'Admin already exists' });
      }
  
      // Create new admin instance
      admin = new Admin({
        name,
        username,
        password,
      });
  
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
  
      // Save admin to database
      await admin.save();
      res.status(201).json({ msg: 'Admin registered successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  
// Start the server
app.listen(8999, () => {
  console.log("Server started on port 8999");
});