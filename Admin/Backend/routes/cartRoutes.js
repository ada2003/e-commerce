  import express from "express";
  import Cart from "../models/Cart.js"; // Assuming your model is in `models/Cart.js`
  import Razorpay from "razorpay";
  import crypto from "crypto";
  import protect from "../middleware/authMiddleware.js";
  import Order from "../models/Order.js";
  const router = express.Router();
  import { sendOrderConfirmationEmail } from '../utils/emailConfig.js';

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  // Add product to cart
  router.post("/add", protect, async (req, res) => {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Product ID and quantity are required." });
    }

    try {
      const userId = req.user.id;
      let cart = await Cart.findOne({ user: userId });

      if (!cart) {
        cart = new Cart({ user: userId, products: [] });
      }

      const productIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      await cart.save();
      res.status(200).json({ message: "Product added to cart successfully!" });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  });

  // Get cart items
  router.get("/mycart", protect, async (req, res) => {
    try {
      const userId = req.user.id;
      const cart = await Cart.findOne({ user: userId }).populate("products.productId");

      if (!cart) {
        return res.status(200).json([]); // Return an empty array if no cart exists
      }

      res.status(200).json(cart.products);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  });

  // Create order endpoint
  router.post("/create-order", protect, async (req, res) => {
    try {
      const userId = req.user.id;
      
      // Get the cart items with populated product details
      const cart = await Cart.findOne({ user: userId }).populate("products.productId");
      
      if (!cart) {
        return res.status(400).json({ message: "Cart not found." });
      }

      if (!cart.products || cart.products.length === 0) {
        return res.status(400).json({ message: "Cart is empty." });
      }

      // Calculate total amount with proper error handling
      let totalAmount = 0;
      for (const item of cart.products) {
        if (!item.productId) {
          return res.status(400).json({ 
            message: "Invalid product in cart. Please remove and try again." 
          });
        }
        
        if (typeof item.productId.price !== 'number' || item.productId.price <= 0) {
          return res.status(400).json({ 
            message: `Invalid price for product: ${item.productId.name}`
          });
        }

        if (typeof item.quantity !== 'number' || item.quantity <= 0) {
          return res.status(400).json({ 
            message: `Invalid quantity for product: ${item.productId.name}`
          });
        }

        totalAmount += item.productId.price * item.quantity;
      }

      if (totalAmount <= 0) {
        return res.status(400).json({ message: "Invalid order amount." });
      }

      // Create Razorpay order
      const options = {
        amount: Math.round(totalAmount * 100), // Convert to paise
        currency: "INR",
        receipt: `rcpt_${Date.now().toString().slice(-8)}`,
      };

      const order = await razorpay.orders.create(options);
      
      res.status(200).json({
        ...order,
        cartAmount: totalAmount
      });
    } catch (error) {
      console.error('Order creation error:', error);
      res.status(500).json({ 
        message: "Failed to create order",
        error: error.message
      });
    }
  });

  // Verify payment endpoint
  router.post("/verify-payment", protect, async (req, res) => {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        userDetails,
        amount,
        orderId
      } = req.body;

      // Verify signature
      const generated_signature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (generated_signature !== razorpay_signature) {
        return res.status(400).json({ message: "Payment verification failed." });
      }

      // Create new order in database
      const newOrder = new Order({
        user: req.user.id,
        paymentId: razorpay_payment_id,
        orderId: orderId,
        userDetails: {
          fullName: userDetails.fullName,
          contact: userDetails.contactNumber,
          email: userDetails.email,
          pinCode: userDetails.pinCode,
          address: userDetails.address,
        },
        amount: amount,
      });

      await newOrder.save();
      try {
        await sendOrderConfirmationEmail({
          userDetails: newOrder.userDetails,
          paymentId: newOrder.paymentId,
          orderId: newOrder.orderId,
          amount: newOrder.amount
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Continue with the order process even if email fails
      }
      // Clear user's cart after successful order
      await Cart.findOneAndUpdate(
        { user: req.user.id },
        { $set: { products: [] } }
      );

      res.status(200).json({ message: "Payment verified and order placed successfully." });
    } catch (error) {
      console.error("Error verifying payment:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  });

  export default router;
