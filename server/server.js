const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Initialize express app
const app = express();

// Port configuration
const Port = process.env.PORT || 5001;

// Routes import
const userModel = require('./models/newUser');
const urlRoute = require("./routes/urlRoute");
const userRoutes = require("./routes/userRoutes"); // Ensure the file name matches exactly, including case sensitivity

// Middlewares
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: false })); // For parsing application/x-www-form-urlencoded
app.use(cors({ origin: true })); // Enable all CORS requests
app.use('/api/users', userRoutes);

// Optional: Middleware to add the base URL to the request object
// Useful for constructing absolute URLs in your responses
app.use((req, res, next) => {
  req.baseUrl = `${req.protocol}://${req.get("host")}`;
  next();
});

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected successfully.");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};

// Connect to MongoDB
connectDB();

// Base route for simple hello
app.get("/", (req, res) => {
  res.send("Hello from the server!");
});
app.post('/register', (req, res) => {
  const newUser ={
    username : req.body.username,
    phone : req.body.phone,
    email : req.body.email,
    password : req.body.password
  }

  userModel.create(newUser)
  .then(newUser =>{
    console.log('new user added to your DB', newUser);
    res.status(200).json({ message: 'User registered successfully' });
  })
  .catch(err => {
    console.error('Error creating a new user', err);
    res.status(500).json({ error: 'An error occurred while creating a user' });
  });
});
app.post('/api/login', async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    const isPasswordValid = await userModel.findOne({ password });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }


    if (isPasswordValid) {
      res.json({ message: 'Login Successfully' });
      console.log('login successfully')
    } else {
      res.json({ message: 'Invalid username or password' });
      console.log('invalid password');
    }
  } catch (error) {
    console.log('Something went wrong', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.get('/api/user/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const user = await userModel.findOne({ email });

    if (user) {
      // Send the user data to the client
      res.json({ user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// URL shortening route
app.use("/url", urlRoute);

// Authentication routes
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});