import { 
  Table, 
  Column, 
  Model, 
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Unique,
  HasMany,
} from 'sequelize-typescript';
import Measurement from './measurement.model';

@Table({ 
  tableName: 'planter', 
  modelName: 'planter',
})
export default class Planter extends Model {
  @Column({ 
    autoIncrement: true, 
    primaryKey: true
  })
  id: number;

  @Unique
  @Column
  name: string;

  @HasMany(() => Measurement)
  measurements: Measurement[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
