import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import OnboardingWizard from "../onboarding/OnboardingWizard";
import {
  Box, Drawer, AppBar, Toolbar, Typography, ListItemButton,
  ListItemIcon, ListItemText, IconButton, Avatar, Menu, MenuItem,
  Divider, Button, CircularProgress, Snackbar, Alert, Badge, Popover,
  useTheme,
} from "@mui/material";
import {
  Dashboard as DashboardIcon, Warning as RiskIcon, FolderOpen as ProjectIcon,
  Settings as SettingsIcon, Menu as MenuIcon, Logout as LogoutIcon,
  Science as DemoIcon, Security as ControlIcon, TrendingUp as KRIIcon,
  Store as VendorIcon, Gavel as FrameworkIcon, Description as PolicyIcon,
  People as UsersIcon, History as AuditIcon, MonitorHeart as MonitorIcon,
  FactCheck as AuditMgmtIcon, Assessment as ReportsIcon,
  Notifications as NotifIcon, LightMode as LightIcon, DarkMode as DarkIcon,
  Hub as ComplianceHubIcon, FactCheck as ScorecardIcon, FolderZip as EvidenceIcon,
  ShieldOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../application/redux/store";
import { logout } from "../../../application/redux/slices/authSlice";
import axiosInstance from "../../../infrastructure/api/axiosInstance";
import { toggleTheme } from "../../../application/redux/slices/uiSlice";
import { useDemoDataStatus, useCreateDemoData, useDeleteDemoData } from "../../../infrastructure/api/demoData.api";
import { useUnreadCount, useUnreadNotifications, useMarkRead, useMarkAllRead } from "../../../infrastructure/api/notifications.api";

const DRAWER_WIDTH = 256;
const COLLAPSED_WIDTH = 68;

const primaryNav = [
  { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { label: "Risk Registry", path: "/risks", icon: <RiskIcon /> },
  { label: "Projects", path: "/projects", icon: <ProjectIcon /> },
  { label: "Controls", path: "/controls", icon: <ControlIcon /> },
  { label: "KRIs", path: "/kris", icon: <KRIIcon /> },
  { label: "Vendors", path: "/vendors", icon: <VendorIcon /> },
];

const complianceNav = [
  { label: "Monitoring", path: "/controls/monitoring", icon: <MonitorIcon /> },
  { label: "Policies", path: "/policies", icon: <PolicyIcon /> },
  { label: "Frameworks", path: "/frameworks", icon: <FrameworkIcon /> },
  { label: "Compliance Hub", path: "/compliance-hub", icon: <ComplianceHubIcon /> },
  { label: "Scorecard", path: "/compliance-scorecard", icon: <ScorecardIcon /> },
  { label: "Evidence", path: "/evidence", icon: <EvidenceIcon /> },
];

const secondaryNav = [
  { label: "Audits", path: "/audits", icon: <AuditMgmtIcon /> },
  { label: "Reports", path: "/reports", icon: <ReportsIcon /> },
  { label: "Settings", path: "/settings", icon: <SettingsIcon /> },
];

const adminNavItems = [
  { label: "Users", path: "/users", icon: <UsersIcon />, roles: ["admin", "super_admin"] },
  { label: "Audit Logs", path: "/audit-logs", icon: <AuditIcon />, roles: ["admin", "super_admin", "auditor"] },
];

function NavSection({ label, items, location, navigate, collapsed }: {
  label?: string;
  items: { label: string; path: string; icon: React.ReactNode }[];
  location: any;
  navigate: any;
  collapsed?: boolean;
}) {
  return (
    <Box sx={{ mb: 1.5 }}>
      {label && (
        <Typography
          variant="caption"
          sx={{
            px: collapsed ? 0 : 2.5, py: 1,
            textAlign: collapsed ? "center" : "left",
            fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.08em", color: "text.secondary",
            fontSize: collapsed ? "0.55rem" : "0.65rem",
            overflow: "hidden",
            whiteSpace: "nowrap",
            transition: "all 0.25s ease",
            opacity: collapsed ? 0 : 1,
            height: collapsed ? 0 : "auto",
            pointerEvents: collapsed ? "none" : "auto",
          }}
        >
          {collapsed ? "—" : label}
        </Typography>
      )}
      {items.map((item) => {
        const active = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
        return (
          <ListItemButton
            key={item.path}
            onClick={() => navigate(item.path)}
            selected={active}
            sx={{
              mx: collapsed ? 0.5 : 1.5,
              my: 0.3,
              py: 1.2,
              px: collapsed ? 1 : 1.5,
              borderRadius: collapsed ? 2 : 1.5,
              justifyContent: collapsed ? "center" : "flex-start",
              minHeight: 44,
              transition: "all 0.2s ease",
            }}
            title={collapsed ? item.label : undefined}
          >
            <ListItemIcon
              sx={{
                minWidth: collapsed ? 0 : 36,
                fontSize: 20,
                justifyContent: "center",
                transition: "min-width 0.25s ease",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: "0.85rem",
                fontWeight: active ? 600 : 500,
                sx: {
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  opacity: collapsed ? 0 : 1,
                  transition: "opacity 0.2s ease",
                  ml: collapsed ? 0 : 1,
                },
              }}
            />
          </ListItemButton>
        );
      })}
    </Box>
  );
}

export default function DashboardLayout() {
  const theme = useTheme();
  const [collapsed, setCollapsed] = useState(false);
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
    try { await axiosInstance.post("/auth/logout"); } catch { /* proceed */ }
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

  const handleNotifClick = (id: string) => markRead.mutate(id);

  const demoLoading = createDemo.isPending || deleteDemo.isPending;
  const userRole = typeof user?.role === "string" ? user.role : (user?.role as any)?.name || "viewer";
  const adminItems = adminNavItems.filter((item) => item.roles.includes(userRole));
  const initials = `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}` || "U";

  const drawerWidth = collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH;

  function renderDrawer(drawerCollapsed: boolean) {
    return (
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Logo */}
        <Box
          sx={{
            px: drawerCollapsed ? 0 : 2.5, py: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: drawerCollapsed ? "center" : "flex-start",
            gap: 1.5,
            transition: "all 0.25s ease",
          }}
        >
          <Box
            sx={{
              width: 36, height: 36, borderRadius: 2.5,
              flexShrink: 0,
              background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <ShieldOutlined sx={{ color: "white", fontSize: 20 }} />
          </Box>
          <Box sx={{ overflow: "hidden", transition: "opacity 0.2s ease, width 0.25s ease", opacity: drawerCollapsed ? 0 : 1, width: drawerCollapsed ? 0 : "auto" }}>
            <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", lineHeight: 1.2, letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>
              TrustMaven
            </Typography>
            <Typography variant="caption" sx={{ color: "text.disabled", fontSize: "0.65rem", letterSpacing: "0.03em", whiteSpace: "nowrap" }}>
              GRC Platform
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ mx: 2 }} />

        {/* Navigation */}
        <Box sx={{ flex: 1, overflow: "hidden", "&:hover": { overflow: "auto" }, pt: 1, pb: 1 }}>
          <NavSection items={primaryNav} location={location} navigate={navigate} collapsed={drawerCollapsed} />
          <Divider sx={{ mx: 2, my: 0.5 }} />
          <NavSection label="Compliance" items={complianceNav} location={location} navigate={navigate} collapsed={drawerCollapsed} />
          <Divider sx={{ mx: 2, my: 0.5 }} />
          <NavSection items={secondaryNav} location={location} navigate={navigate} collapsed={drawerCollapsed} />
          {adminItems.length > 0 && (
            <>
              <Divider sx={{ mx: 2, my: 0.5 }} />
              <NavSection label="Admin" items={adminItems} location={location} navigate={navigate} collapsed={drawerCollapsed} />
            </>
          )}
        </Box>

        <Divider sx={{ mx: 2 }} />
        {/* Demo Button */}
        <Box sx={{ px: drawerCollapsed ? 1 : 2, py: 1.5 }}>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            onClick={handleDemoToggle}
            disabled={demoLoading}
            color={demoStatus?.hasDemoData ? "error" : "inherit"}
            sx={{
              borderRadius: 2, py: 1,
              px: drawerCollapsed ? 0 : 1.5,
              minWidth: 0,
              fontSize: "0.75rem",
              borderColor: "divider",
              transition: "all 0.2s ease",
              "&:hover": { borderColor: demoStatus?.hasDemoData ? "error.main" : "primary.main" },
            }}
          >
            {drawerCollapsed ? (
              demoLoading ? <CircularProgress size={16} /> : <DemoIcon sx={{ fontSize: 18 }} />
            ) : (
              demoLoading ? <CircularProgress size={14} sx={{ mr: 0.5 }} /> : (demoStatus?.hasDemoData ? "Clear Demo Data" : "Load Demo Data")
            )}
          </Button>
        </Box>

        {/* Toggle + User */}
        <Box sx={{ px: drawerCollapsed ? 0.5 : 2, py: 1, display: "flex", alignItems: "center", gap: drawerCollapsed ? 0 : 1.5, justifyContent: drawerCollapsed ? "center" : "flex-start" }}>
          <IconButton
            size="small"
            onClick={() => setCollapsed(!collapsed)}
            sx={{
              color: "text.disabled",
              transition: "transform 0.3s ease",
              transform: drawerCollapsed ? "rotate(180deg)" : "rotate(0deg)",
              "&:hover": { color: "text.secondary" },
            }}
          >
            <MenuIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <Box sx={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 1.5, overflow: "hidden", transition: "opacity 0.2s ease", opacity: drawerCollapsed ? 0 : 1 }}>
            <Avatar sx={{ width: 32, height: 32, flexShrink: 0, bgcolor: "primary.main", fontSize: "0.8rem", fontWeight: 700 }}>
              {initials}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.disabled", fontSize: "0.65rem", display: "block" }}>
                {typeof user?.role === "string" ? user.role : (user?.role as any)?.name || "viewer"}
              </Typography>
            </Box>
            <IconButton size="small" onClick={handleLogout} sx={{ color: "text.disabled", flexShrink: 0 }}>
              <LogoutIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: theme.palette.mode === "dark" ? "rgba(22, 33, 62, 0.85)" : "rgba(255, 255, 255, 0.72)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid",
          borderColor: "divider",
          transition: theme.transitions.create(["width", "margin-left"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Toolbar sx={{ minHeight: "56px !important" }}>
          <IconButton
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 1.5, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />

          <IconButton onClick={() => dispatch(toggleTheme())} size="small" sx={{ mr: 1, color: "text.secondary" }}>
            {themeMode === "dark" ? <LightIcon fontSize="small" /> : <DarkIcon fontSize="small" />}
          </IconButton>

          <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)} size="small" sx={{ mr: 1, color: "text.secondary" }}>
            <Badge badgeContent={unreadCount || 0} color="error" max={99}>
              <NotifIcon fontSize="small" />
            </Badge>
          </IconButton>

          <Popover
            open={Boolean(notifAnchor)}
            anchorEl={notifAnchor}
            onClose={() => setNotifAnchor(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Box sx={{ width: 360, maxHeight: 420, overflow: "auto" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, borderBottom: 1, borderColor: "divider" }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>Notifications</Typography>
                {(unreadCount || 0) > 0 && (
                  <Button size="small" onClick={() => markAllRead.mutate()} sx={{ fontSize: "0.75rem" }}>Mark all read</Button>
                )}
              </Box>
              {(!unreadNotifications || unreadNotifications.length === 0) ? (
                <Box sx={{ p: 4, textAlign: "center" }}>
                  <Typography variant="body2" color="text.secondary">No new notifications</Typography>
                </Box>
              ) : (
                unreadNotifications.map((n) => (
                  <Box
                    key={n.id}
                    sx={{
                      p: 2, borderBottom: 1, borderColor: "divider",
                      cursor: "pointer",
                      backgroundColor: n.isRead ? "transparent" : "action.hover",
                      "&:hover": { backgroundColor: "action.selected" },
                      transition: "background-color 0.15s ease",
                    }}
                    onClick={() => handleNotifClick(n.id)}
                  >
                    <Typography variant="body1" fontWeight={600} sx={{ fontSize: "0.85rem" }}>{n.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>{n.message}</Typography>
                    <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5, display: "block" }}>
                      {new Date(n.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                ))
              )}
            </Box>
          </Popover>

          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small">
            <Avatar sx={{ width: 30, height: 30, bgcolor: "primary.main", fontSize: "0.75rem", fontWeight: 700 }}>
              {initials}
            </Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <MenuItem disabled sx={{ opacity: "1 !important" }}>
              <Box>
                <Typography variant="body1" fontWeight={600}>{user?.firstName} {user?.lastName}</Typography>
                <Typography variant="caption" color="text.secondary">{user?.email}</Typography>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => { setAnchorEl(null); navigate("/settings"); }}>
              <SettingsIcon sx={{ mr: 1.5, fontSize: 18 }} /> Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1.5, fontSize: 18 }} /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
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
          {renderDrawer(false)}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              overflowX: "hidden",
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
          open
        >
          {renderDrawer(collapsed)}
        </Drawer>
      </Box>

      <OnboardingWizard />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          pt: { xs: 9, md: 10 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "background.default",
          minHeight: "100vh",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
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
        <Alert severity={toast?.severity} onClose={() => setToast(null)} variant="filled" sx={{ borderRadius: 3 }}>
          {toast?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
