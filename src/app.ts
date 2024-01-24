import 'dotenv/config';
import 'module-alias/register';
import express from 'express';
import measurementRoutes from '@routes/measurement/measurement';

const app = express();

app.use(express.json());

app.use('/', measurementRoutes);

export default app;
