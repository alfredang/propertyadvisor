import express from 'express';
import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';

// Middleware to verify JWT
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// GET /api/favorites - Get user results
router.get('/', authenticate, async (req, res) => {
    try {
        const favorites = await prisma.favorite.findMany({
            where: { userId: req.userId },
            include: {
                property: {
                    include: { images: true }
                }
            }
        });
        res.json(favorites.map(f => f.property));
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch favorites' });
    }
});

// POST /api/favorites - Add to favorites
router.post('/', authenticate, async (req, res) => {
    try {
        const { propertyId } = req.body;
        const favorite = await prisma.favorite.create({
            data: {
                userId: req.userId,
                propertyId
            }
        });
        res.status(201).json(favorite);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add favorite' });
    }
});

// DELETE /api/favorites/:id - Remove from favorites
router.delete('/:propertyId', authenticate, async (req, res) => {
    try {
        const { propertyId } = req.params;
        await prisma.favorite.delete({
            where: {
                userId_propertyId: {
                    userId: req.userId,
                    propertyId
                }
            }
        });
        res.json({ message: 'Removed from favorites' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove favorite' });
    }
});

export default router;
