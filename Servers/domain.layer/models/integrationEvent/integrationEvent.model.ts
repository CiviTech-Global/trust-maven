import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  Default,
  PrimaryKey,
} from "sequelize-typescript";
import { Integration } from "../integration/integration.model";

@Table({
  tableName: "integration_events",
  timestamps: true,
  indexes: [
    { fields: ["integrationId"] },
    { fields: ["integrationId", "collectedAt"] },
  ],
})
export class IntegrationEvent extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Integration)
  @Column({ type: DataType.UUID, allowNull: false })
  integrationId!: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  eventType!: string;

  @Column({
    type: DataType.ENUM("success", "failure", "pending"),
    defaultValue: "pending",
  })
  status!: string;

  @Column({ type: DataType.TEXT })
  message!: string | null;

  @Column({ type: DataType.JSONB })
  payload!: Record<string, unknown> | null;

  @Column({ type: DataType.UUID })
  matchedEvidenceId!: string | null;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  collectedAt!: Date;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => Integration)
  integration!: Integration;
}
