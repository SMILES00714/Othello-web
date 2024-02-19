import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router: Router = Router();

// Middleware to verify token
const verifyToken = (req: Request, res: Response, next: () => void) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized. Token is missing.' });
    }

    try {
        const decoded = jwt.verify(token, 'secretKey') as { id: string }; // Verify and decode token
        // req.userId = decoded.id; // Attach userId to request object for later use
        next(); // Call the next middleware or route handler
    } catch (error) {
        return res.status(401).send({ message: 'Unauthorized. Invalid token.' });
    }
};

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
        const user = await User.findOne({ name: req.body.name });
        if (!user || !(await user.comparePassword(req.body.password))) {
            return res.status(401).send({ message: 'Authentication failed. Invalid user or password.' });
        }

        const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' }); // Use a more secure secret key

        res.status(200).send({ message: 'Logged in successfully', token, name: req.body.name });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all users
router.get('/users', verifyToken, async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

export default router;
