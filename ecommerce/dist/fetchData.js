import axios from 'axios';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function fetchData() {
    try {
        const response = await axios.get('https://dummyjson.com/products');
        const products = response.data.products;
        for (const product of products) {
            await prisma.product.upsert({
                where: { id: product.id },
                update: {
                    title: product.title,
                    category: product.category,
                    price: product.price,
                    rating: product.rating,
                    image: product.images && product.images.length > 0 ? product.images[0] : null, // Assuming images is an array
                },
                create: {
                    id: product.id,
                    title: product.title,
                    category: product.category,
                    price: product.price,
                    rating: product.rating,
                    image: product.images && product.images.length > 0 ? product.images[0] : null, // Assuming images is an array
                },
            });
        }
        console.log('Data successfully fetched and stored.');
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
fetchData();
//# sourceMappingURL=fetchData.js.map