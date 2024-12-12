import express from "express";
import Cart from "../models/Cart.js"; // Assuming your model is in `models/Cart.js`

import  protect  from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/add", protect, async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: "Product ID and quantity are required" });
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
    res.status(500).json({ message: "Failed to add product to cart" });
  }
});

router.get("/mycart", protect, async (req, res) => {
  try {
    const userId = req.user.id;
    let cart = await Cart.findOne({ user: userId }).populate("products.productId");

    if (!cart) {
      // If no cart found, create an empty cart for the user
      cart = new Cart({ user: userId, products: [] });
      await cart.save();  // Save the new empty cart
    }

    res.json(cart.products);  // Send the cart items or an empty array if no products
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
