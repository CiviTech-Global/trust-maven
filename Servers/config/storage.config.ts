import path from "path";

export const storageConfig = {
  uploadDir: path.resolve(process.cwd(), process.env.UPLOAD_DIR || "uploads"),
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || "10485760", 10),
  allowedMimeTypes: (process.env.ALLOWED_MIME_TYPES || "image/jpeg,image/png,image/gif,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain,text/csv,application/json,application/zip").split(","),
};
