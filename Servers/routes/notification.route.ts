import { Router, Response } from "express";
import { authenticate, AuthenticatedRequest } from "../middleware/auth.middleware";
import { notificationController } from "../controllers/notification.ctrl";

const router = Router();

router.use(authenticate);

// SSE stream for real-time notifications
router.get("/stream", (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.userId;

  // Setup SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");

  // Send initial connection confirmation
  res.write(`data: ${JSON.stringify({ type: "connected" })}\n\n`);

  // Register connection for push notifications
  sseConnections.set(userId, res);

  // Heartbeat every 30s to keep connection alive
  const heartbeat = setInterval(() => {
    try {
      res.write(`: heartbeat\n\n`);
    } catch {
      clearInterval(heartbeat);
    }
  }, 30000);

  // Cleanup on disconnect
  req.on("close", () => {
    clearInterval(heartbeat);
    sseConnections.delete(userId);
  });
});

router.get("/", (req, res) => notificationController.findAll(req, res));
router.get("/unread", (req, res) => notificationController.findUnread(req, res));
router.get("/unread/count", (req, res) => notificationController.getUnreadCount(req, res));
router.put("/:id/read", (req, res) => notificationController.markAsRead(req, res));
router.put("/read-all", (req, res) => notificationController.markAllAsRead(req, res));

// SSE connection registry — push notifications to connected clients
const sseConnections = new Map<string, Response>();

/** Push a notification to a connected user via SSE */
export function pushNotification(userId: string, notification: unknown): void {
  const conn = sseConnections.get(userId);
  if (conn) {
    try {
      conn.write(`data: ${JSON.stringify({ type: "notification", payload: notification })}\n\n`);
    } catch {
      sseConnections.delete(userId);
    }
  }
}

export default router;
