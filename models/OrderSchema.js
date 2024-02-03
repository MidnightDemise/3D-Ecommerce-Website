import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    orderId: { type: String, required: true, unique: true },
    products: [
      {
        productId: { type: String, required: true },
        productName: {type: String , required: true},
        productPrice: {type: String , required: true},
        quantity: { type: Number, required: true },
      },
    ],
    orderDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered'], default: 'Pending' },
    // Add other fields relevant to your order, such as shipping information, total cost, etc.
  });
  
  orderSchema.pre('save', function (next) {
    if (!this.orderId) {
      this.orderId = uuidv4();
    }
    next();
  });
  
  const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
  
  export default Order;