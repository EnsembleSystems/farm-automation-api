import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';
import sequelize from '@config/database';
import Weather from '@models/weather.model';

const CACHE_TIME = 60000 // 10 minutes

const router = Router();

router.get('/weather', async (req: Request, res: Response) => {
  try {
    const weather = await Weather.findOne({
      where: { 'deletedAt': null },
    });
    if (!weather || Date.now() - (new Date(weather.createdAt)).getTime() > CACHE_TIME) {
      const resp = await fetch('https://weather.gc.ca/api/app/en/Location/BC-96?type=city', {
        method: 'GET',
      });
      const [updatedWeather] = await resp.json();
      const createdWeather = await sequelize.transaction(async (t) => {
        if (weather) {
          await Weather.destroy({
            where: {
              id: weather.id,
            },
          });
        }
        return Weather.create({
          temperature: updatedWeather.observation.temperature.metric,
          humidity: parseInt(updatedWeather.observation.humidity, 10),
          condition: updatedWeather.observation.condition,
        }, { transaction: t });
      })
      return res.json({ weather: createdWeather });
    } 
    return res.json({ weather });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
});

export default router;
