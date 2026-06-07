import { Table, Column, Model, DataType, ForeignKey, BelongsTo, CreatedAt, Default, PrimaryKey } from "sequelize-typescript";
import { KRI } from "../kri/kri.model";

@Table({ tableName: "kri_history", timestamps: false })
export class KriHistory extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => KRI)
  @Column({ type: DataType.UUID, allowNull: false })
  kriId!: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  value!: number;

  @CreatedAt
  @Column({ type: DataType.DATE })
  recordedAt!: Date;

  @BelongsTo(() => KRI)
  kri!: KRI;
}
