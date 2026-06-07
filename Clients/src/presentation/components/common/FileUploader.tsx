import { useRef, useState } from "react";
import {
  Box, Button, LinearProgress, Alert,
} from "@mui/material";
import { Upload as UploadIcon } from "@mui/icons-material";
import { useUploadFile } from "../../../infrastructure/api/files.api";

interface FileUploaderProps {
  entityType: string;
  entityId: string;
  onUploaded?: () => void;
}

const MAX_SIZE_MB = 10;

export default function FileUploader({ entityType, entityId, onUploaded }: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const uploadFile = useUploadFile();

  const handleSelect = () => {
    inputRef.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File size exceeds ${MAX_SIZE_MB}MB limit`);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    try {
      await uploadFile.mutateAsync({ file, relatedEntityType: entityType, relatedEntityId: entityId });
      onUploaded?.();
    } catch (err: any) {
      setError(err.message || "Upload failed");
    }

    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <Box>
      <input
        ref={inputRef}
        type="file"
        hidden
        onChange={handleChange}
      />
      <Button
        variant="outlined"
        startIcon={<UploadIcon />}
        onClick={handleSelect}
        disabled={uploadFile.isPending}
      >
        {uploadFile.isPending ? "Uploading..." : "Upload File"}
      </Button>

      {uploadFile.isPending && <LinearProgress sx={{ mt: 1 }} />}

      {error && (
        <Alert severity="error" sx={{ mt: 1 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
    </Box>
  );
}
