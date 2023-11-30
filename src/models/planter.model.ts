import { Table, Column, Model } from 'sequelize-typescript';

@Table
export default class Planter extends Model {
  @Column
  temperature: number;

  @Column
  moisture: number;
}
