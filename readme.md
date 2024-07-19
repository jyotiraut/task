# E-commerce Application

This e-commerce application uses Node.js, TypeScript, Prisma, PostgreSQL, and AdminJS to provide a robust solution for managing products and categories. It fetches product details from an external API, stores them in a PostgreSQL database, and offers an AdminJS interface for CRUD operations.

## Project Setup

## Project Setup

1. Initialize Project:
   ```bash
   mkdir ecommerce
   cd ecommerce
   npm install

2. Initialize TypeScript:
  npx tsc --init

3. Initialize Prisma:  
   npx prisma init 

4. Apply Prisma Migrations:
   npx prisma migrate dev --name init

5. Fetch and Store Data:
  npx ts-node fetchData.ts

6. Start AdminJS:
   npx ts-node admin.ts
   
Access AdminJS:
Open http://localhost:3000/admin


