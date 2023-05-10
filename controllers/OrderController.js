import OrderModel from '../models/Order.js';
import CartModel from '../models/Cart.js';

export const createOrder = async (req, res) => {
    try {
        const doc = new OrderModel({
            orderList: req.body.orderList,
            totalPrice: req.body.totalPrice,
            date: Date.now(),
            createdBy: req.userId,
        });

        const newOrder = await doc.save();
        await CartModel.deleteMany({ createdBy: req.userId });
        res.json({
            msg: 'Заказ успешно создан',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Не удалось добавить товар',
        });
    }
};
export const getAll = async (req, res) => {
    try {
        const orders = await OrderModel.find({ createdBy: req.userId });
        res.json(orders);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Не удалось получить заказы',
        });
    }
};
