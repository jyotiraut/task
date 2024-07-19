"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const prisma = new client_1.PrismaClient();
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const { default: AdminJS } = yield import('adminjs');
    const { default: AdminJSExpress } = yield import('@adminjs/express');
    const { Database, Resource } = yield import('@adminjs/prisma');
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
    const app = (0, express_1.default)();
    app.use(adminJs.options.rootPath, adminRouter);
    app.listen(3000, () => {
        console.log('AdminJS is running on http://localhost:3000/admin');
    });
});
run().catch((e) => {
    console.error('Failed to start AdminJS:', e);
    process.exit(1);
});
