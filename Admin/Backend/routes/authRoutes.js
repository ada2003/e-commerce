import express from 'express';
import protect from '../middleware/authMiddleware.js'; // Adjust the path based on your project structure

const router = express.Router();

router.get('/validate-token', protect, (req, res) => {
  res.status(200).json({ message: 'Token is valid' });
});

export default router;
