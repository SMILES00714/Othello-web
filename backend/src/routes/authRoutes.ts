import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router: Router = Router();

// Register user
router.post('/register', async (req: Request, res: Response) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Login user
router.post('/login', async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user || !(await user.comparePassword(req.body.password))) {
            return res.status(401).send({ message: 'Authentication failed. Invalid user or password.' });
        }

        const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' }); // Use a more secure secret key
        res.status(200).send({ message: 'Logged in successfully', token });
    } catch (error) {
        res.status(400).send(error);
    }
});

export default router;
