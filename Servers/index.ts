import "reflect-metadata";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { sequelize } from "./database/db";
import { generalApiLimiter, authLimiter } from "./middleware/rateLimit.middleware";
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
import riskCategoryRoutes from "./routes/riskCategory.route";
import riskQuantificationRoutes from "./routes/riskQuantification.route";
import controlMonitoringRoutes from "./routes/controlMonitoring.route";
import auditMgmtRoutes from "./routes/auditMgmt.route";
import reportTemplateRoutes from "./routes/reportTemplate.route";
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

// Rate limiting (tiered — auth routes get stricter limits)
app.use("/api/v1/auth", authLimiter);
app.use(generalApiLimiter);

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check — verifies database connectivity
app.get("/api/health", async (_req, res) => {
  const checks: Record<string, { status: "ok" | "error"; error?: string }> = {};

  try {
    await sequelize.query("SELECT 1");
    checks.database = { status: "ok" };
  } catch (err: any) {
    checks.database = { status: "error", error: err.message };
  }

  const allOk = Object.values(checks).every((c) => c.status === "ok");
  res.status(allOk ? 200 : 503).json({
    status: allOk ? "ok" : "degraded",
    timestamp: new Date().toISOString(),
    checks,
  });
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
app.use("/api/v1/risk-categories", riskCategoryRoutes);
app.use("/api/v1/risk-quantification", riskQuantificationRoutes);
app.use("/api/v1/control-monitoring", controlMonitoringRoutes);
app.use("/api/v1/audits", auditMgmtRoutes);
app.use("/api/v1/reports", reportTemplateRoutes);

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

    const server = app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });

    // Graceful shutdown
    async function shutdown(signal: string) {
      logger.info(`${signal} received — shutting down gracefully`);

      server.close(async () => {
        logger.info("HTTP server closed");

        try {
          await sequelize.close();
          logger.info("Database connection closed");
        } catch (err) {
          logger.error("Error closing database:", err);
        }

        process.exit(0);
      });

      // Force exit after 10s if connections don't drain
      setTimeout(() => {
        logger.error("Graceful shutdown timed out — forcing exit");
        process.exit(1);
      }, 10000).unref();
    }

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
}

bootstrap();

export default app;
