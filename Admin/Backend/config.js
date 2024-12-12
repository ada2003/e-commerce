import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ 
  path: path.resolve(__dirname, '.env'),
  debug: true // This will log any errors in loading the .env file
});

// Validate critical environment variables
if (!process.env.JWT_SECRET) {
  console.error('CRITICAL ERROR: JWT_SECRET is not defined');
  // Optionally, you can exit the process if this is a critical configuration
  // process.exit(1);
}

export const config = {
  jwtSecret: process.env.JWT_SECRET,
  // Add other environment variables as needed
};