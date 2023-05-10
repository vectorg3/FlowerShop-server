import { body } from 'express-validator';

export const loginValidation = [
    body('password', 'Минимальная длина пароля 8 символов').isLength({
        min: 8,
    }),
];

export const registerValidation = [
    body('password', 'Минимальная длина пароля 8 символов').isLength({
        min: 8,
    }),
];
