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
import { Organization } from "../organization/organization.model";
import { RegulationDefinition } from "../regulationDefinition/regulationDefinition.model";

@Table({
  tableName: "organization_regulations",
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ["organizationId", "regulationId"],
    },
  ],
})
export class OrganizationRegulation extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Organization)
  @Column({ type: DataType.UUID, allowNull: false })
  organizationId!: string;

  @ForeignKey(() => RegulationDefinition)
  @Column({ type: DataType.UUID, allowNull: false })
  regulationId!: string;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  adoptedAt!: string;

  @Column({ type: DataType.DATEONLY })
  targetComplianceDate!: string | null;

  @Column({
    type: DataType.ENUM("active", "planned", "deprecated"),
    defaultValue: "active",
  })
  status!: string;

  @Column({ type: DataType.TEXT })
  notes!: string | null;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDemoData!: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => Organization)
  organization!: Organization;

  @BelongsTo(() => RegulationDefinition)
  regulation!: RegulationDefinition;
}
