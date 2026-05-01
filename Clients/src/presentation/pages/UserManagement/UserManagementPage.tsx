import { useState } from "react";
import {
  Box, Typography, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, LinearProgress, Alert, IconButton, Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  PersonOff as DeactivateIcon,
  PersonAdd as ActivateIcon,
} from "@mui/icons-material";
import { useUsers, useDeactivateUser, useActivateUser } from "../../../infrastructure/api/users.api";
import EmptyState from "../../components/common/EmptyState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import InviteUserModal from "./InviteUserModal";

const ROLE_LABELS: Record<string, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  risk_manager: "Risk Manager",
  analyst: "Analyst",
  auditor: "Auditor",
  viewer: "Viewer",
};

const ROLE_COLORS: Record<string, "primary" | "secondary" | "default" | "success" | "info" | "warning"> = {
  super_admin: "primary",
  admin: "primary",
  risk_manager: "success",
  analyst: "info",
  auditor: "warning",
  viewer: "default",
};

export default function UserManagementPage() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [deactivateId, setDeactivateId] = useState<string | null>(null);
  const { data: users, isLoading, error } = useUsers();
  const deactivateMutation = useDeactivateUser();
  const activateMutation = useActivateUser();

  const handleDeactivate = async () => {
    if (!deactivateId) return;
    await deactivateMutation.mutateAsync(deactivateId);
    setDeactivateId(null);
  };

  const handleActivate = async (id: string) => {
    await activateMutation.mutateAsync(id);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h1">User Management</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setInviteOpen(true)}>
          Invite User
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>Failed to load users</Alert>}
      {isLoading && <LinearProgress sx={{ mb: 2 }} />}

      {!isLoading && (!users || users.length === 0) ? (
        <EmptyState
          title="No users found"
          description="Invite users to collaborate on risk management"
          actionLabel="Invite First User"
          onAction={() => setInviteOpen(true)}
        />
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Login</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user: any) => {
                const roleName = user.role?.name || "viewer";
                return (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Typography variant="body1" fontWeight={500}>
                        {user.firstName} {user.lastName}
                      </Typography>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={ROLE_LABELS[roleName] || roleName}
                        size="small"
                        color={ROLE_COLORS[roleName] || "default"}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.isActive ? "Active" : "Inactive"}
                        size="small"
                        color={user.isActive ? "success" : "default"}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Never"}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      {user.isActive ? (
                        <Tooltip title="Deactivate">
                          <IconButton size="small" color="error" onClick={() => setDeactivateId(user.id)}>
                            <DeactivateIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Activate">
                          <IconButton size="small" color="success" onClick={() => handleActivate(user.id)}>
                            <ActivateIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <InviteUserModal open={inviteOpen} onClose={() => setInviteOpen(false)} />

      <ConfirmDialog
        open={!!deactivateId}
        title="Deactivate User"
        message="Are you sure you want to deactivate this user? They will no longer be able to log in."
        confirmLabel="Deactivate"
        onConfirm={handleDeactivate}
        onCancel={() => setDeactivateId(null)}
        loading={deactivateMutation.isPending}
      />
    </Box>
  );
}
