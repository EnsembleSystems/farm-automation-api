'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('planter', [
      {
        name: 'pi 1',
      },
      {
        name: 'pi 2',
      },
      {
        name: 'pi 3',
      },
      {
        name: 'pi 4',
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('planter', null, {});
  }
}
