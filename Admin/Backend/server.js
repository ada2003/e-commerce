import cors from "cors";
import bcrypt from "bcrypt";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import auth from './routes/auth.js';
import customerRoutes from "./routes/customer-auth.js";
import User from "./models/User.js";
import projectRoutes from "./routes/product.js"; // Import your project routes
import addProductRoutes from "./routes/addproduct.js";
import blogRoutes from "./routes/blog.js";
import imageRoutes from "./routes/imageRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import dotenv from 'dotenv';
import fs from "fs";
import express from "express";
const app = express();
dotenv.config();
// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/uploads/slides", express.static("uploads/slides"));

app.use("/uploads", express.static("uploads"));

const createDefaultAdmin = async () => {
  const email = "admin1@gmail.com"; // Change email to the desired one
  const password = "admin123"; // Keep password or change it

  const uploadPath = "uploads/blogs";
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  // Check if the admin user already exists
  const existingAdmin = await User.findOne({ email });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const adminUser = new User({
      email,
      password: hashedPassword,
    });

    await adminUser.save();
    console.log("Default admin user created with email:", email);
  } else {
    console.log("Admin user already exists.");
  }
};

// Call the function to create the admin user
createDefaultAdmin();

// Routes
console.log('JWT_SECRET is:', process.env.JWT_SECRET ? process.env.JWT_SECRET : 'UNDEFINED');
app.use("/api/authRoutes", authRoutes);
app.use("/api/auth", customerRoutes);
app.use("/api/auth",auth );

app.use("/api/images", imageRoutes);

app.use("/api/blog", blogRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/", projectRoutes);

// Use your project routes
app.use("/api/add", addProductRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
