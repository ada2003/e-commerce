import express from "express";
import Order from "../models/Order.js"; // Adjust the path based on your project structure

const router = express.Router();

// Endpoint to fetch specific fields of all successful orders
router.get("/successful-orders", async (req, res) => {
  try {
    // Fetch all orders with specific fields
    const successfulOrders = await Order.find({
      paymentId: { $exists: true, $ne: "" }, // Ensures paymentId is not empty
    }).select(
      "userDetails.fullName userDetails.contact userDetails.email userDetails.pinCode userDetails.address amount date"
    );

    // Send response
    res.status(200).json({
      success: true,
      orders: successfulOrders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
});

export default router;
