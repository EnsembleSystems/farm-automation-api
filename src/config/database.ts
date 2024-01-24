import { Sequelize } from 'sequelize-typescript';
import path from 'path';

const sequelize = new Sequelize({
  host: process.env.DB_HOSTNAME,
  port: parseInt(process.env.DB_PORT as string, 10),
  database: process.env.DATABASE,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  dialect: 'postgres',
  models: [path.resolve(__dirname + '/../models/*.js')],
});

export default sequelize;
