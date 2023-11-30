"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sequelize_typescript_1 = require("sequelize-typescript");
require("dotenv/config");
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.DATABASE,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),
    dialect: 'postgres',
    models: [__dirname + '/models'],
});
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Express & TypeScript Server' });
});
app.listen(port, () => {
    console.log(`Server is online at http://localhost:${port}`);
});
