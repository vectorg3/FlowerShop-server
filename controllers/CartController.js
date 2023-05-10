import CartModel from '../models/Cart.js';

export const addToCart = async (req, res) => {
    try {
        const cart = new CartModel({
            name: req.body.name,
            image: req.body.image,
            price: req.body.price,
            description: req.body.description,
            createdBy: req.userId,
        });
        await cart.save();
        res.json({ msg: 'Товар успешно добавлен в корзину' });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Не удалось добавить товар в корзину',
        });
    }
};
export const getAll = async (req, res) => {
    try {
        const cartList = await CartModel.find({ createdBy: req.userId });
        return res.json(cartList);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Не удалось получить товары',
        });
    }
};
export const removeFromCart = async (req, res) => {
    try {
        const candidate = await CartModel.findById(req.params.id);
        if (!candidate) {
            return res.status(404).json({ msg: 'Такого элемента нет!' });
        }
        await CartModel.findByIdAndRemove(req.params.id);
        res.json({
            msg: 'Товар успешно удалён',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Не удалось удалить товар',
        });
    }
};
