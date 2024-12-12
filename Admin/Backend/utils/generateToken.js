import dotenv from 'dotenv';  // Load environment variables from .env file
import jwt from 'jsonwebtoken';

dotenv.config();

// Retrieve the secret key from the environment variable
const secretKey = process.env.JWT_SECRET;

// Customizable expiration time from environment variable (defaults to '1h' if not provided)
const tokenExpiry = process.env.JWT_EXPIRY || '1h';

const generateToken = (userId) => {
  if (!secretKey) {
    console.error('JWT_SECRET is not defined');
    throw new Error('JWT_SECRET is not defined in the environment variables');
  }

  // Generate a JWT token using the secret key with a customizable expiration time
  try {
    return jwt.sign({ userId }, secretKey, { expiresIn: tokenExpiry });
  } catch (error) {
    console.error('Error generating token:', error.message);
    throw new Error('Failed to generate token');
  }
};

export default generateToken;
