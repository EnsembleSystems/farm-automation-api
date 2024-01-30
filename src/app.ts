import 'dotenv/config';
import 'module-alias/register';
import express from 'express';
import measurementRoutes from '@routes/measurement/measurement';
import weatherRoutes from '@routes/weather/weather';

const app = express();

app.use(express.json());

app.use('/', measurementRoutes);
app.use('/', weatherRoutes);

export default app;
