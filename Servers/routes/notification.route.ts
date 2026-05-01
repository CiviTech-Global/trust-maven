import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { notificationController } from "../controllers/notification.ctrl";

const router = Router();

router.use(authenticate);

router.get("/", (req, res) => notificationController.findAll(req, res));
router.get("/unread", (req, res) => notificationController.findUnread(req, res));
router.get("/unread/count", (req, res) => notificationController.getUnreadCount(req, res));
router.put("/:id/read", (req, res) => notificationController.markAsRead(req, res));
router.put("/read-all", (req, res) => notificationController.markAllAsRead(req, res));

export default router;
