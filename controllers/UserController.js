import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import UserModel from '../models/User.js';

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array()[0]);
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        let checkPhone = await UserModel.findOne({ phone: req.body.phone });
        if (checkPhone)
            return res
                .status(400)
                .json({ msg: 'Указанный номер телефона занят!' });
        const doc = new UserModel({
            name: req.body.name,
            phone: req.body.phone,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secretKey',
            {
                expiresIn: '30d',
            }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Не удалось зарегистрироваться',
        });
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ phone: req.body.phone });

        if (!user) {
            return res.status(404).json({
                msg: 'Пользователь не найден',
            });
        }

        const isValidPass = await bcrypt.compare(
            req.body.password,
            user._doc.passwordHash
        );

        if (!isValidPass) {
            return res.status(404).json({
                msg: 'Неверный номер телефона или пароль',
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secretKey',
            {
                expiresIn: '30d',
            }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Не удалось авторизоваться',
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                msg: 'Пользователь не найден',
            });
        }
        const { passwordHash, createdAt, updatedAt, __v, ...userData } =
            user._doc;

        res.json({
            ...userData,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Нет доступа',
        });
    }
};
