import express from 'express';
import prisma from '../lib/prisma.js';

const router = express.Router();

// GET /api/properties - Search properties with filters
router.get('/', async (req, res) => {
    try {
        const {
            location,
            minPrice,
            maxPrice,
            propertyType,
            listingType,
            bedrooms,
            bathrooms,
            district
        } = req.query;

        const filters = {};

        if (location) {
            filters.OR = [
                { title: { contains: location, mode: 'insensitive' } },
                { location: { contains: location, mode: 'insensitive' } },
                { address: { contains: location, mode: 'insensitive' } },
            ];
        }

        if (minPrice || maxPrice) {
            filters.price = {};
            if (minPrice) filters.price.gte = parseFloat(minPrice);
            if (maxPrice) filters.price.lte = parseFloat(maxPrice);
        }

        if (propertyType) {
            filters.propertyType = propertyType;
        }

        if (listingType) {
            filters.listingType = listingType;
        }

        if (bedrooms) {
            filters.bedrooms = parseInt(bedrooms);
        }

        if (bathrooms) {
            filters.bathrooms = parseInt(bathrooms);
        }

        if (district) {
            filters.district = parseInt(district);
        }

        const properties = await prisma.property.findMany({
            where: filters,
            include: {
                images: true,
                agent: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        res.json(properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ error: 'Failed to fetch properties' });
    }
});

// GET /api/properties/:id - Get property by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const property = await prisma.property.findUnique({
            where: { id },
            include: {
                images: true,
                agent: true,
            },
        });

        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        res.json(property);
    } catch (error) {
        console.error('Error fetching property:', error);
        res.status(500).json({ error: 'Failed to fetch property' });
    }
});

export default router;
