import ProductModel from '../models/Product.js';

export const addProduct = async (req, res) => {
    try {
        const doc = new ProductModel({
            name: req.body.name,
            price: req.body.price,
            rating: req.body.rating,
            image: req.body.img,
            description: req.body.description,
            category: req.body.category
        });

        const newProduct = await doc.save();
        res.json({
            _id: newProduct._id,
            name: newProduct.name,
            price: newProduct.price,
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
        const products = await ProductModel.find();
        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Не удалось получить товары',
        });
    }
};
export const getOne = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Не удалось получить товар',
        });
    }
}
