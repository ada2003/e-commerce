import mongoose from 'mongoose';

const slideSchema = new mongoose.Schema({
  image_path: {
    type: String,
    required: true,
  },
  image_name: {
    type: String,
    required: true,
  },
  uploaded_at: {
    type: Date,
    default: Date.now,
  },
});

const Slide = mongoose.model('Slide', slideSchema);

export default Slide;
