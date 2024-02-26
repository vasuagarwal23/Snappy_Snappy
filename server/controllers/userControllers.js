import { hash, compare } from 'bcrypt';
import User from '../models/userModel.js';

export async function register(req, res, next) {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res
                .status(209)
                .json({
                    success: false,
                    message: 'User already registered'
                });
        }
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res
                .status(209)
                .json({
                    success: false,
                    message: 'Email already registered'
                });
        }
        const hashedPassword = await hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        delete user.password;
        return res
            .status(200)
            .json({
                success: true,
                message: 'User registered successfully',
                user: user,
            });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

export async function login(req, res, next) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res
                .status(202)
                .json({
                    success: false,
                    message: 'User not found'
                });
        }
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(203).json({
                success: false,
                message: 'Password is incorrect',
            })
        }
        delete user.password;
        return res
            .status(200)
            .json({
                success: true,
                message: 'User logined successfully',
                user: user,
            });
    } catch (err) {
        console.error(err);
        next(err);
    }
}
