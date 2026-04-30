import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  PrimaryKey,
  CreatedAt,
} from "sequelize-typescript";

@Table({ tableName: "roles", timestamps: false })
export class Role extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column({ type: DataType.STRING(50), allowNull: false, unique: true })
  name!: string;

  @Column({ type: DataType.TEXT })
  description!: string;

  @Column({ type: DataType.JSONB, defaultValue: [] })
  permissions!: string[];

  @CreatedAt
  createdAt!: Date;
}
