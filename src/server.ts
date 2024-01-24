import app from './app';
import sequelize from '@config/database';

(async () => {
  await sequelize.sync();

  app.listen(process.env.API_PORT, () => {
    console.log(`App listening on port ${process.env.API_PORT}`)
  });
})();
