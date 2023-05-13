import express from 'express';
import mongoose from 'mongoose';
import { registerValidation, loginValidation } from './validation.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import * as ProductController from './controllers/ProductController.js';
import * as CartController from './controllers/CartController.js';
import * as OrderController from './controllers/OrderController.js';
import cors from 'cors';

mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.MONGODB_URI)
    // .connect('mongodb+srv://admin:392311@flowershop.x5zfckd.mongodb.net/FlowerShop?retryWrites=true&w=majority')
    .then(() => {
        console.log('Database Connected');
    })
    .catch((err) => {
        console.log('Database Error', err);
    });

const app = express();

app.use(cors());
app.use(express.json());
// auth routes
app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);
// product routes
app.post('/products', checkAuth, ProductController.addProduct);
app.get('/products', ProductController.getAll);
app.get('/products/:id', ProductController.getOne);
// cart routes
app.post('/cart', checkAuth, CartController.addToCart);
app.delete('/cart/:id', checkAuth, CartController.removeFromCart);
app.get('/cart', checkAuth, CartController.getAll);
//order routes
app.post('/orders', checkAuth, OrderController.createOrder);
app.get('/orders', checkAuth, OrderController.getAll);

app.listen(process.env.PORT || 4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server started');
});
