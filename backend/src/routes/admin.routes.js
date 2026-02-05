import express from 'express';
import prisma from '../lib/prisma.js';

const router = express.Router();

// Middleware to check for Admin role (simplified)
const isAdmin = async (req, res, next) => {
    // In a real app, we'd check req.userId and the User model role
    next();
};

// GET /api/admin/properties - List for admin
router.get('/properties', isAdmin, async (req, res) => {
    const properties = await prisma.property.findMany({
        include: { agent: true }
    });
    res.json(properties);
});

// POST /api/admin/properties - Create new
router.post('/properties', isAdmin, async (req, res) => {
    try {
        const propertyData = req.body;
        const property = await prisma.property.create({
            data: propertyData
        });
        res.status(201).json(property);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create property' });
    }
});

// PUT /api/admin/properties/:id - Update
router.put('/properties/:id', isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const property = await prisma.property.update({
            where: { id },
            data: updateData
        });
        res.json(property);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update property' });
    }
});

// DELETE /api/admin/properties/:id
router.delete('/properties/:id', isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.property.delete({ where: { id } });
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete' });
    }
});

export default router;
