import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  paymentId: { type: String, required: true },
  orderId: { type: String, required: true },
  userDetails: {
    fullName: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
    pinCode: { type: String, required: true },
    address: { type: String, required: true },
  },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
