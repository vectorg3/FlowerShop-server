import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        orderList: {
            type: [Object],
            required: true,
        },
        status: {
            type: String,
            default: 'Создан',
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
);

export default mongoose.model('Order', OrderSchema);
