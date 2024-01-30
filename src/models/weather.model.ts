import { 
  Table, 
  Column, 
  Model, 
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';

@Table({ 
  tableName: 'weather', 
  modelName: 'weather',
})
export default class Weather extends Model {
  @Column({ 
    autoIncrement: true, 
    primaryKey: true
  })
  id: number;

  @Column
  temperature: number;

  @Column
  humidity: number;

  @Column
  condition: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
