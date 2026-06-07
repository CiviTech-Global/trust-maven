import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { fileController } from "../controllers/file.ctrl";
import { fileOperationsLimiter } from "../middleware/rateLimit.middleware";
import { fileService, upload } from "../services/file.service";

const router = Router();

router.use(authenticate, tenantIsolation);

router.post("/", fileOperationsLimiter, upload.single("file"), (req, res) => fileController.upload(req, res));
router.get("/", (req, res) => fileController.findByEntity(req, res));
router.get("/:id", (req, res) => fileController.download(req, res));
router.delete("/:id", (req, res) => fileController.delete(req, res));

export default router;
