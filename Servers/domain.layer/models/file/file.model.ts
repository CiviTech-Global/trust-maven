import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  Default,
  PrimaryKey,
} from "sequelize-typescript";
import { Organization } from "../organization/organization.model";
import { User } from "../user/user.model";

@Table({ tableName: "files", timestamps: false })
export class File extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Organization)
  @Column({ type: DataType.UUID, allowNull: false })
  organizationId!: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  filename!: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  path!: string;

  @Column({ type: DataType.STRING(100) })
  mimeType!: string;

  @Column({ type: DataType.BIGINT })
  size!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  uploadedBy!: string;

  @Column({ type: DataType.STRING(100) })
  relatedEntityType!: string | null;

  @Column({ type: DataType.UUID })
  relatedEntityId!: string | null;

  @CreatedAt
  createdAt!: Date;

  @BelongsTo(() => Organization)
  organization!: Organization;

  @BelongsTo(() => User)
  uploader!: User;
}
