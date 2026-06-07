import {
  Box, Typography, IconButton, Tooltip, Chip, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
} from "@mui/material";
import {
  Download as DownloadIcon,
  Delete as DeleteIcon,
  Description as FileIcon,
} from "@mui/icons-material";
import { useFilesByEntity, useDeleteFile, getFileDownloadUrl } from "../../../infrastructure/api/files.api";
import type { FileRecord } from "../../../domain/interfaces";
import ConfirmDialog from "./ConfirmDialog";
import { useState } from "react";

interface FileListProps {
  entityType: string;
  entityId: string;
}

function formatFileSize(bytes: number | null): string {
  if (!bytes) return "--";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(mimeType: string | null): string {
  if (!mimeType) return "generic";
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType === "application/pdf") return "pdf";
  if (mimeType.includes("spreadsheet") || mimeType.includes("excel")) return "spreadsheet";
  if (mimeType.includes("document") || mimeType.includes("word")) return "document";
  return "generic";
}

const FILE_TYPE_COLORS: Record<string, string> = {
  image: "#DBEAFE",
  pdf: "#FEE2E2",
  spreadsheet: "#D1FAE5",
  document: "#EDE9FE",
  generic: "#F1F5F9",
};

export default function FileList({ entityType, entityId }: FileListProps) {
  const { data: files, isLoading } = useFilesByEntity(entityType, entityId);
  const deleteFile = useDeleteFile();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteFile.mutateAsync(deleteId);
    setDeleteId(null);
  };

  if (isLoading) return null;

  if (!files || files.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <FileIcon sx={{ fontSize: 40, color: "text.secondary", mb: 1 }} />
        <Typography variant="body2" color="text.secondary">No files attached</Typography>
      </Box>
    );
  }

  return (
    <>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Uploaded</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file: FileRecord) => {
              const fileType = getFileIcon(file.mimeType);
              return (
                <TableRow key={file.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>{file.filename}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={fileType}
                      size="small"
                      sx={{
                        backgroundColor: FILE_TYPE_COLORS[fileType] || "#F1F5F9",
                        fontWeight: 500,
                        fontSize: "0.7rem",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {formatFileSize(file.size)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(file.createdAt).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Download">
                      <IconButton
                        size="small"
                        component="a"
                        href={getFileDownloadUrl(file.id)}
                        target="_blank"
                      >
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => setDeleteId(file.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete File"
        message="Are you sure you want to delete this file? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleteFile.isPending}
      />
    </>
  );
}
