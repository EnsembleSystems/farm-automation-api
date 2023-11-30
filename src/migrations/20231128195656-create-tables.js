/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable('Planter', {
          id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          temperature: Sequelize.DataTypes.INTEGER,
          moisture: Sequelize.DataTypes.INTEGER,
          updated_at: Sequelize.DataTypes.DATE,
          created_at: Sequelize.DataTypes.DATE,
          deleted_at: Sequelize.DataTypes.DATE,
        }, { transaction: t }),
        queryInterface.createTable('Weather', {
          id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          temperature: Sequelize.DataTypes.INTEGER,
          humidity: Sequelize.DataTypes.INTEGER,
          type: Sequelize.DataTypes.STRING,
          updated_at: Sequelize.DataTypes.DATE,
          created_at: Sequelize.DataTypes.DATE,
          deleted_at: Sequelize.DataTypes.DATE,
        }, { transaction: t }),
      ])
    })
  },
  async down (queryInterface) {
    return queryInterface.sequelize.transaction(t => {{
      return Promise.all([
        queryInterface.dropTable('Planter', { transaction: t }),
        queryInterface.dropTable('Weather', { transaction: t }),
      ]);
    }});
  }
};
