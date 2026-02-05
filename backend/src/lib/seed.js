import prisma from './prisma.js';

const propertyTypes = ['CONDO', 'HDB', 'LANDED', 'COMMERCIAL'];
const listingTypes = ['SALE', 'RENT'];
const regions = [
    { district: 1, name: 'Boat Quay / Raffles Place / Marina' },
    { district: 9, name: 'Orchard / River Valley' },
    { district: 10, name: 'Tanglin / Holland / Bukit Timah' },
    { district: 11, name: 'Newton / Novena' },
    { district: 15, name: 'Katong / Joo Chiat / Amber Road' },
    { district: 19, name: 'Hougang / Punggol / Sengkang' },
    { district: 20, name: 'Ang Mo Kio / Bishan / Thomson' },
];

async function main() {
    console.log('Seeding database...');

    // Create or get Agents
    const agents = await Promise.all([
        prisma.agent.upsert({
            where: { email: 'john.tan@propertyguru.clone' },
            update: {},
            create: {
                name: 'John Tan',
                email: 'john.tan@propertyguru.clone',
                phone: '+65 9123 4567',
                photoUrl: 'https://i.pravatar.cc/150?u=johntan',
            }
        }),
        prisma.agent.upsert({
            where: { email: 'sarah.lim@propertyguru.clone' },
            update: {},
            create: {
                name: 'Sarah Lim',
                email: 'sarah.lim@propertyguru.clone',
                phone: '+65 8234 5678',
                photoUrl: 'https://i.pravatar.cc/150?u=sarahlim',
            }
        })
    ]);

    // Create Properties
    for (let i = 0; i < 110; i++) {
        const region = regions[Math.floor(Math.random() * regions.length)];
        const pType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
        const lType = listingTypes[Math.floor(Math.random() * listingTypes.length)];
        const agent = agents[Math.floor(Math.random() * agents.length)];

        const price = lType === 'SALE'
            ? Math.floor(Math.random() * 5000000) + 500000
            : Math.floor(Math.random() * 10000) + 2000;

        const property = await prisma.property.create({
            data: {
                title: `${pType} in ${region.name}`,
                description: `Experience luxury living in this beautiful ${pType.toLowerCase()}. Features include modern amenities, great views, and prime location.`,
                price: price,
                propertyType: pType,
                listingType: lType,
                location: region.name,
                district: region.district,
                bedrooms: Math.floor(Math.random() * 5) + 1,
                bathrooms: Math.floor(Math.random() * 3) + 1,
                floorArea: Math.floor(Math.random() * 2000) + 500,
                address: `${Math.floor(Math.random() * 200) + 1} Singapore Way, District ${region.district}`,
                lat: 1.290270 + (Math.random() - 0.5) * 0.1,
                lng: 103.851959 + (Math.random() - 0.5) * 0.1,
                agentId: agent.id,
                images: {
                    create: [
                        { url: `https://picsum.photos/seed/${i * 10}/800/600`, isPrimary: true },
                        { url: `https://picsum.photos/seed/${i * 10 + 1}/800/600` },
                        { url: `https://picsum.photos/seed/${i * 10 + 2}/800/600` },
                    ]
                }
            }
        });
    }

    console.log('Seed completed successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
