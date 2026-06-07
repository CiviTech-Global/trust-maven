import fs from "fs";
import path from "path";
import multer from "multer";
import { File } from "../domain.layer/models/file/file.model";
import { storageConfig } from "../config/storage.config";
import { auditService } from "./audit.service";
import { AuditAction } from "../types";
import { logger } from "../utils/logger";

function ensureUploadDir(): void {
  if (!fs.existsSync(storageConfig.uploadDir)) {
    fs.mkdirSync(storageConfig.uploadDir, { recursive: true });
  }
}

const diskStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    ensureUploadDir();
    cb(null, storageConfig.uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (
  _req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (storageConfig.allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`File type ${file.mimetype} is not allowed`));
  }
};

export const upload = multer({
  storage: diskStorage,
  limits: { fileSize: storageConfig.maxFileSize },
  fileFilter,
});

export class FileService {
  async upload(
    file: Express.Multer.File,
    organizationId: string,
    userId: string,
    relatedEntityType?: string,
    relatedEntityId?: string
  ) {
    const record = await File.create({
      filename: file.originalname,
      path: file.path,
      mimeType: file.mimetype,
      size: file.size,
      organizationId,
      uploadedBy: userId,
      relatedEntityType: relatedEntityType || null,
      relatedEntityId: relatedEntityId || null,
    });

    await auditService.log({
      organizationId,
      userId,
      entityType: "file",
      entityId: record.id,
      action: AuditAction.CREATE,
      changes: { filename: file.originalname, size: file.size, mimeType: file.mimetype },
    });

    return record;
  }

  async findByEntity(organizationId: string, entityType: string, entityId: string) {
    return File.findAll({
      where: { organizationId, relatedEntityType: entityType, relatedEntityId: entityId },
      order: [["createdAt", "DESC"]],
    });
  }

  async findById(id: string, organizationId: string) {
    const file = await File.findOne({ where: { id, organizationId } });
    if (!file) throw new Error("File not found");
    return file;
  }

  async delete(id: string, organizationId: string, userId: string) {
    const file = await File.findOne({ where: { id, organizationId } });
    if (!file) throw new Error("File not found");

    try {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    } catch (err: any) {
      logger.error(`Failed to delete file from disk: ${file.path}`, err.message);
    }

    await file.destroy();

    await auditService.log({
      organizationId,
      userId,
      entityType: "file",
      entityId: id,
      action: AuditAction.DELETE,
    });
  }

  getFilePath(file: File): string {
    return file.path;
  }
}

export const fileService = new FileService();
