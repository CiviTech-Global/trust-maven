import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Badge,
  Popover,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Warning as RiskIcon,
  FolderOpen as ProjectIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Logout as LogoutIcon,
  Science as DemoIcon,
  Security as ControlIcon,
  TrendingUp as KRIIcon,
  Store as VendorIcon,
  Gavel as FrameworkIcon,
  People as UsersIcon,
  History as AuditIcon,
  Notifications as NotifIcon,
  LightMode as LightIcon,
  DarkMode as DarkIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../application/redux/store";
import { logout } from "../../../application/redux/slices/authSlice";
import axiosInstance from "../../../infrastructure/api/axiosInstance";
import { toggleTheme } from "../../../application/redux/slices/uiSlice";
import { useDemoDataStatus, useCreateDemoData, useDeleteDemoData } from "../../../infrastructure/api/demoData.api";
import { useUnreadCount, useUnreadNotifications, useMarkRead, useMarkAllRead } from "../../../infrastructure/api/notifications.api";

const DRAWER_WIDTH = 240;

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { label: "Risk Registry", path: "/risks", icon: <RiskIcon /> },
  { label: "Projects", path: "/projects", icon: <ProjectIcon /> },
  { label: "Controls", path: "/controls", icon: <ControlIcon /> },
  { label: "KRIs", path: "/kris", icon: <KRIIcon /> },
  { label: "Vendors", path: "/vendors", icon: <VendorIcon /> },
  { label: "Frameworks", path: "/frameworks", icon: <FrameworkIcon /> },
  { label: "Settings", path: "/settings", icon: <SettingsIcon /> },
];

const adminNavItems = [
  { label: "Users", path: "/users", icon: <UsersIcon />, roles: ["admin", "super_admin"] },
  { label: "Audit Logs", path: "/audit-logs", icon: <AuditIcon />, roles: ["admin", "super_admin", "auditor"] },
];

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);
  const [toast, setToast] = useState<{ severity: "success" | "error"; message: string } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const themeMode = useSelector((state: RootState) => (state.ui as any)?.theme || "light");

  const { data: demoStatus } = useDemoDataStatus();
  const createDemo = useCreateDemoData();
  const deleteDemo = useDeleteDemoData();
  const { data: unreadCount } = useUnreadCount();
  const { data: unreadNotifications } = useUnreadNotifications();
  const markRead = useMarkRead();
  const markAllRead = useMarkAllRead();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch {
      // proceed with local logout even if server call fails
    }
    dispatch(logout());
    navigate("/login");
  };

  const handleDemoToggle = async () => {
    try {
      if (demoStatus?.hasDemoData) {
        await deleteDemo.mutateAsync();
        setToast({ severity: "success", message: "Demo data cleared" });
      } else {
        await createDemo.mutateAsync();
        setToast({ severity: "success", message: "Demo data loaded successfully" });
      }
    } catch {
      setToast({ severity: "error", message: "Failed to toggle demo data" });
    }
  };

  const handleNotifClick = (id: string) => {
    markRead.mutate(id);
  };

  const demoLoading = createDemo.isPending || deleteDemo.isPending;
  const userRole = user?.role || "viewer";

  const allNavItems = [
    ...navItems,
    ...adminNavItems.filter((item) => item.roles.includes(userRole)),
  ];

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar>
        <Typography variant="h3" sx={{ fontWeight: 700, color: "primary.main" }}>
          TrustMaven
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ flex: 1, px: 1, pt: 1 }}>
        {allNavItems.map((item) => (
          <ListItemButton
            key={item.path}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path || location.pathname.startsWith(item.path + "/")}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": { backgroundColor: "primary.dark" },
                "& .MuiListItemIcon-root": { color: "white" },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          size="small"
          startIcon={demoLoading ? <CircularProgress size={16} /> : <DemoIcon />}
          onClick={handleDemoToggle}
          disabled={demoLoading}
          color={demoStatus?.hasDemoData ? "error" : "primary"}
        >
          {demoLoading
            ? "Processing..."
            : demoStatus?.hasDemoData
              ? "Clear Demo Data"
              : "Load Demo Data"}
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
          backgroundColor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />

          <IconButton onClick={() => dispatch(toggleTheme())} sx={{ mr: 1 }}>
            {themeMode === "dark" ? <LightIcon /> : <DarkIcon />}
          </IconButton>

          <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)} sx={{ mr: 1 }}>
            <Badge badgeContent={unreadCount || 0} color="error" max={99}>
              <NotifIcon />
            </Badge>
          </IconButton>

          <Popover
            open={Boolean(notifAnchor)}
            anchorEl={notifAnchor}
            onClose={() => setNotifAnchor(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Box sx={{ width: 360, maxHeight: 400, overflow: "auto" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, borderBottom: 1, borderColor: "divider" }}>
                <Typography variant="h4">Notifications</Typography>
                {(unreadCount || 0) > 0 && (
                  <Button size="small" onClick={() => markAllRead.mutate()}>Mark all read</Button>
                )}
              </Box>
              {(!unreadNotifications || unreadNotifications.length === 0) ? (
                <Box sx={{ p: 3, textAlign: "center" }}>
                  <Typography variant="body2" color="text.secondary">No new notifications</Typography>
                </Box>
              ) : (
                unreadNotifications.map((n) => (
                  <Box
                    key={n.id}
                    sx={{
                      p: 2,
                      borderBottom: 1,
                      borderColor: "divider",
                      cursor: "pointer",
                      backgroundColor: n.isRead ? "transparent" : "action.hover",
                      "&:hover": { backgroundColor: "action.selected" },
                    }}
                    onClick={() => handleNotifClick(n.id)}
                  >
                    <Typography variant="body1" fontWeight={500}>{n.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{n.message}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: "0.65rem" }}>
                      {new Date(n.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                ))
              )}
            </Box>
          </Popover>

          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
              {user?.firstName?.[0] || "U"}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem disabled>
              <Typography variant="body2">
                {user?.firstName} {user?.lastName}
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1, fontSize: 18 }} /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: DRAWER_WIDTH },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              borderRight: "1px solid",
              borderColor: "divider",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pt: 11,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          backgroundColor: "background.default",
        }}
      >
        <Outlet />
      </Box>

      <Snackbar
        open={!!toast}
        autoHideDuration={4000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={toast?.severity} onClose={() => setToast(null)} variant="filled">
          {toast?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
