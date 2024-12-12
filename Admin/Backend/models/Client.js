import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add any additional fields you want for Client (e.g., phone number, address, etc.)
});

// Hash the password before saving the client
ClientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Hash the password using bcrypt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to check password
ClientSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create and export the Client model
const Client = mongoose.model('Client', ClientSchema);
export default Client;
