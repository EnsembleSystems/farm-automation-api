import { Router, Request, Response } from 'express';
import { body, validationResult, matchedData } from 'express-validator';
import { Op } from 'sequelize';
import sequelize from '@config/database';
import Measurement from '@models/measurement.model';
import Planter from '@models/planter.model';

const router = Router();

const validateGetMeasurement = [
  body('name', 'a planter name is required').notEmpty().escape(),
];

const validateGetMeasurements = [
  body('names', 'planter names are required').notEmpty().escape(),
];

const validatePut = [
  body('name', 'a planter name is required').notEmpty().escape(),
  body('temperature', 'a temperature value is required').notEmpty().escape(),
  body('moisture', 'a moisture value is required').notEmpty().escape(),
];

router.post('/measurement', ...validateGetMeasurement, async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const fields = matchedData(req);
    try {
      const measurement = await Measurement.findOne({
        where: { '$planter.name$': fields.name },
        include: 'planter'
      });
      if (!measurement) {
        return res.status(404);
      }
      return res.json({ measurement });
    } catch (err) {
      console.log(err);
      return res.status(500);
    }
  }
  return res.status(400).json({ errors: result.array() });
});

router.post('/measurements', ...validateGetMeasurements, async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const fields = matchedData(req);
    try {
      const measurements = await Measurement.findAll({
        where: { '$planter.name$': {
          [Op.in]: fields.names, 
        }},
        include: 'planter'
      });
      if (!measurements) {
        return res.status(404);
      }
      return res.json({ measurements });
    } catch (err) {
      console.log(err);
      return res.status(500);
    }
  }
  return res.status(400).json({ errors: result.array() });
});

router.put('/measurement', ...validatePut, async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const fields = matchedData(req);
    try {
      const planter = await Planter.findOne({
        where: { name: fields.name },
        attributes: ['id']
      });
      if (!planter) {
        return res.status(404);
      }
      const measurement = await sequelize.transaction(async (t) => {
        await Measurement.destroy({
          where: { 
            planterId: planter.id,
          },
          transaction: t
        });
        return Measurement.create({
          temperature: fields.temperature,
          moisture: fields.moisture,
          planterId: planter.id,
        }, { transaction: t });
      })
      if (!measurement) {
        return res.status(500);
      }
      return res.status(201).json({ measurement });
    } catch (err) {
      console.log(err);
      return res.status(500);
    }
  }
  return res.status(400).json({ errors: result.array() });
});

export default router;
