import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  DefaultScope,
} from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';

@DefaultScope(() => ({
  attributes: {
    exclude: ['password', 'googleAccount', 'googleRefreshToken', 'deletedAt'],
  },
}))
@Table
export class User extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUIDV4,
    allowNull: false,
    defaultValue: () => uuid(),
    unique: true,
    primaryKey: true,
  })
  uuid: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  userName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  city: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  country: string;
}
