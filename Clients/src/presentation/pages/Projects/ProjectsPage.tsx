import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Tooltip, Chip, LinearProgress, Alert, Link,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useProjects, useDeleteProject } from "../../../infrastructure/api/projects.api";
import EmptyState from "../../components/common/EmptyState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import CreateProjectModal from "./CreateProjectModal";

const STATUS_COLORS: Record<string, "default" | "primary" | "success" | "warning" | "info"> = {
  draft: "default",
  active: "success",
  on_hold: "warning",
  completed: "info",
  archived: "default",
};

const STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  active: "Active",
  on_hold: "On Hold",
  completed: "Completed",
  archived: "Archived",
};

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { data: projects, isLoading, error } = useProjects();
  const deleteMutation = useDeleteProject();

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteMutation.mutateAsync(deleteId);
    setDeleteId(null);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h1">Projects</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateOpen(true)}>
          New Project
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>Failed to load projects</Alert>}
      {isLoading && <LinearProgress sx={{ mb: 2 }} />}

      {!isLoading && (!projects || projects.length === 0) ? (
        <EmptyState
          title="No projects yet"
          description="Create a project to organize and manage related risks"
          actionLabel="Create First Project"
          onAction={() => setCreateOpen(true)}
        />
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Risks</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects?.map((project: any) => (
                <TableRow key={project.id} hover>
                  <TableCell>
                    <Link
                      component="button"
                      variant="body1"
                      fontWeight={500}
                      underline="hover"
                      onClick={() => navigate(`/projects/${project.id}`)}
                      sx={{ textAlign: "left" }}
                    >
                      {project.name}
                    </Link>
                    {project.description && (
                      <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 300 }}>
                        {project.description}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={STATUS_LABELS[project.status] || project.status}
                      size="small"
                      color={STATUS_COLORS[project.status] || "default"}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {project.owner ? `${project.owner.firstName} ${project.owner.lastName}` : "--"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {project.startDate || "--"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {project.endDate || "--"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{project.risks?.length ?? 0}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => setDeleteId(project.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <CreateProjectModal open={createOpen} onClose={() => setCreateOpen(false)} />

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleteMutation.isPending}
      />
    </Box>
  );
}
