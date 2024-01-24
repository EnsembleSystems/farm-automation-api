/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable('planter', {
          id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          name: {
            type: Sequelize.DataTypes.STRING,
            unique: true,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
          },
          deletedAt: Sequelize.DataTypes.DATE,
        }, { transaction: t }),
        queryInterface.createTable('measurement', {
          id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          planterId: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
              model: 'planter',
              key: 'id',
            },
            allowNull: false,
          },
          temperature: Sequelize.DataTypes.INTEGER,
          moisture: Sequelize.DataTypes.INTEGER,
          createdAt: {
            type: Sequelize.DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
          },
          deletedAt: Sequelize.DataTypes.DATE,
        }, { transaction: t }),
        queryInterface.createTable('weather', {
          id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          temperature: Sequelize.DataTypes.INTEGER,
          humidity: Sequelize.DataTypes.INTEGER,
          type: Sequelize.DataTypes.STRING,
          createdAt: {
            type: Sequelize.DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
          },
          deletedAt: Sequelize.DataTypes.DATE,
        }, { transaction: t }),
      ])
    })
  },
  async down (queryInterface) {
    return queryInterface.sequelize.transaction(t => {{
      return Promise.all([
        queryInterface.dropTable('planter', { transaction: t }),
        queryInterface.dropTable('measurement', { transaction: t }),
        queryInterface.dropTable('weather', { transaction: t }),
      ]);
    }});
  }
};
