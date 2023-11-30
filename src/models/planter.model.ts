import { 
  Table, 
  Column, 
  Model, 
  UpdatedAt, 
  CreatedAt, 
  DeletedAt,
} from 'sequelize-typescript';

@Table
export default class Planter extends Model {
  @Column({ 
    autoIncrement: true, 
    primaryKey: true
  })
  id: number;

  @UpdatedAt
  updated_at: Date;

  @CreatedAt
  created_at: Date;

  @DeletedAt
  deleted_at: Date;

  @Column
  temperature: number;

  @Column
  moisture: number;
}
