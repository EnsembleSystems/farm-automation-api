"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
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
                    }, { transaction: t }),
                ]);
            });
        });
    },
    down(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            return queryInterface.sequelize.transaction(t => {
                {
                    return Promise.all([
                        queryInterface.dropTable('Planter', { transaction: t }),
                        queryInterface.dropTable('Weather', { transaction: t }),
                    ]);
                }
            });
        });
    }
};
