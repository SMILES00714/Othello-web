import { Router, Request, Response } from 'express';
import { Client } from '../models/Client';

const router: Router = Router();

// GET all clients
router.get('/', async (req, res) => {
    const clients = await Client.find();
    res.json(clients);
});

export default router;
