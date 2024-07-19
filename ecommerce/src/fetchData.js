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
const axios_1 = __importDefault(require("axios"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get('https://dummyjson.com/products');
            const products = response.data.products;
            for (const product of products) {
                yield prisma.product.upsert({
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
            yield prisma.$disconnect();
        }
    });
}
fetchData();
