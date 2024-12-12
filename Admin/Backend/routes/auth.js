import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Client from '../models/Client.js';
import generateToken from '../utils/generateToken.js';

const router = express.Router();

// User Login ANd New registration Form Client COde 

// Register New User
// Registration route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if client already exists
    const clientExists = await Client.findOne({ email });
    if (clientExists) {
      return res.status(400).json({ message: 'Client already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new client
    const newClient = new Client({ name, email, password: hashedPassword });

    // Save the client to the database
    await newClient.save();

    // Generate a token for the client
    const token = generateToken(newClient._id);

    // Respond with client data and token
    res.status(201).json({
      message: 'Client registered successfully',
      token,
      client: { id: newClient._id, name: newClient.name, email: newClient.email },
    });
  } catch (error) {
    console.error('Error registering client:', error);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
});





router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(`Login attempt for email: ${email}`); // Add this log line here to see the attempted email

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found'); // Add this log line to confirm when the user is not found
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Login successful
    res.status(200).json({ success: true, message: 'Login successful!' });
  } catch (err) {
    console.error(err); // Log any server-side error
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
// Customber Routes 




export default router;
