import { Response } from "express";
import fs from "fs";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { fileService } from "../services/file.service";

export class FileController {
  async upload(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ success: false, message: "No file provided" });
        return;
      }

      const { relatedEntityType, relatedEntityId } = req.body;
      const record = await fileService.upload(
        req.file,
        req.user!.organizationId,
        req.user!.userId,
        relatedEntityType || undefined,
        relatedEntityId || undefined
      );

      res.status(201).json({ success: true, data: record });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async findByEntity(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { entityType, entityId } = req.query;
      if (!entityType || !entityId) {
        res.status(400).json({ success: false, message: "entityType and entityId are required" });
        return;
      }
      const files = await fileService.findByEntity(
        req.user!.organizationId,
        entityType as string,
        entityId as string
      );
      res.json({ success: true, data: files });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async download(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const file = await fileService.findById(id, req.user!.organizationId);
      const filePath = fileService.getFilePath(file);

      if (!fs.existsSync(filePath)) {
        res.status(404).json({ success: false, message: "File not found on disk" });
        return;
      }

      res.setHeader("Content-Type", file.mimeType || "application/octet-stream");
      res.setHeader("Content-Disposition", `attachment; filename="${file.filename}"`);
      res.setHeader("Content-Length", file.size?.toString() || "0");
      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async delete(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      await fileService.delete(id, req.user!.organizationId, req.user!.userId);
      res.json({ success: true, message: "File deleted" });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }
}

export const fileController = new FileController();
