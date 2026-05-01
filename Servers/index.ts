import "reflect-metadata";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";
import { sequelize } from "./database/db";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import projectRoutes from "./routes/project.route";
import riskRoutes from "./routes/risk.route";
import dashboardRoutes from "./routes/dashboard.route";
import demoDataRoutes from "./routes/demoData.route";
import controlRoutes from "./routes/control.route";
import exportRoutes from "./routes/export.route";
import auditLogRoutes from "./routes/auditLog.route";
import notificationRoutes from "./routes/notification.route";
import kriRoutes from "./routes/kri.route";
import vendorRoutes from "./routes/vendor.route";
import frameworkRoutes from "./routes/framework.route";
import { logger } from "./utils/logger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/risks", riskRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/demo-data", demoDataRoutes);
app.use("/api/v1/controls", controlRoutes);
app.use("/api/v1/export", exportRoutes);
app.use("/api/v1/audit-logs", auditLogRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/kris", kriRoutes);
app.use("/api/v1/vendors", vendorRoutes);
app.use("/api/v1/frameworks", frameworkRoutes);

// Global error handler
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    logger.error("Unhandled error:", err.message);
    res.status(500).json({
      error: "Internal server error",
      message:
        process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
);

// Database connection and server start
async function bootstrap() {
  try {
    await sequelize.authenticate();
    logger.info("Database connected");

    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: true });
    }

    app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
}

bootstrap();

export default app;
