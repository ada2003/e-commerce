import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Customer from '../models/Customer.js';

const router = express.Router();

// Customer Registration Route
router.post('/customer-register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if customer already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: 'Customer already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new customer
    const newCustomer = new Customer({
      name,
      email,
      password: hashedPassword
    });

    await newCustomer.save();

    res.status(201).json({ 
      message: 'Customer registered successfully',
      customer: { 
        id: newCustomer._id, 
        name: newCustomer.name, 
        email: newCustomer.email 
      }
    });
  } catch (error) {
    console.error('Customer Registration error:', error);
    res.status(500).json({ message: 'Server error during customer registration' });
  }
});

// Customer Login Route
router.post('/customer-login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find customer
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { id: customer._id, email: customer.email }, 
      process.env.JWT_SECRET || 'india@2024', 
      { expiresIn: '1h' }
    );

    res.status(200).json({ 
      message: 'Customer login successful',
      token,
      customer: { 
        id: customer._id, 
        name: customer.name, 
        email: customer.email 
      }
    });
  } catch (error) {
    console.error('Customer login error:', error);
    res.status(500).json({ message: 'Server error during customer login' });
  }
});

// Middleware to verify customer token
export const verifyCustomerToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'india@2024'
    );
    req.customer = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default router;