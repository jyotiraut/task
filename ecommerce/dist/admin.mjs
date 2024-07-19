import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/prisma';
import { PrismaClient } from '@prisma/client';
import express from 'express';
const prisma = new PrismaClient();
const run = async () => {
    AdminJS.registerAdapter({ Database, Resource });
    const adminJs = new AdminJS({
        databases: [],
        resources: [
            {
                resource: { model: prisma.product, client: prisma },
                options: {
                    properties: {
                        id: { isVisible: { list: true, edit: false, filter: true, show: true } },
                        title: { isTitle: true },
                        category: { isVisible: { list: true, edit: true, filter: true, show: true } },
                        price: { type: 'number' },
                        rating: { type: 'number' },
                        image: { type: 'string' },
                    },
                },
            },
            {
                resource: { model: prisma.category, client: prisma },
                options: {
                    properties: {
                        id: { isVisible: { list: true, edit: false, filter: true, show: true } },
                        name: { isTitle: true },
                    },
                },
            },
        ],
        rootPath: '/admin',
    });
    const adminRouter = AdminJSExpress.buildRouter(adminJs);
    const app = express();
    app.use(adminJs.options.rootPath, adminRouter);
    app.listen(3000, () => {
        console.log('AdminJS is running on http://localhost:3000/admin');
    });
};
run().catch((e) => {
    console.error('Failed to start AdminJS:', e);
    process.exit(1);
});
//# sourceMappingURL=admin.mjs.map