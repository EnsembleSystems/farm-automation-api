import express, { Express, Request, Response , Application } from 'express';
import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config';

const app: Application = express();
const port = process.env.PORT || 8080;

const sequelize = new Sequelize({
  database: process.env.DATABASE,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  port: parseInt(process.env.DB_PORT as string, 10),
  dialect: 'postgres',
  models: [__dirname + '/models'],
})

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Express & TypeScript Server' });
});

app.listen(port, () => {
  console.log(`Server is online at http://localhost:${port}`);
});
