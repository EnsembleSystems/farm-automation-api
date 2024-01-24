import { 
  Table, 
  Column, 
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Model, 
} from 'sequelize-typescript';
import Planter from './planter.model';

@Table({ 
  tableName: 'measurement', 
  modelName: 'measurement',
})
export default class Measurement extends Model {
  @Column({ 
    autoIncrement: true, 
    primaryKey: true
  })
  id: number;

  @ForeignKey(() => Planter)
  @Column
  planterId: number;

  @BelongsTo(() => Planter)
  planter: Planter;

  @Column
  temperature: number;

  @Column
  moisture: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
