const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: false,
  },
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
