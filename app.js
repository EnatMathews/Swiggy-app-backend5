const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Admin = require("./models/Admin");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// Start the server
app.listen(8999, () => {
  console.log("Server started on port 8999");
});