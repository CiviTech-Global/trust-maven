import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { mfaService } from "../services/mfa.service";
import { User } from "../domain.layer/models/user/user.model";

export class MfaController {
  /** GET /api/v1/auth/mfa/status */
  async status(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const result = await mfaService.getStatus(req.user!.userId);
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  /** POST /api/v1/auth/mfa/setup — generate secret + QR code URI */
  async setup(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = await User.findByPk(req.user!.userId);
      if (!user) {
        res.status(404).json({ success: false, message: "User not found" });
        return;
      }
      const result = await mfaService.generateSecret(req.user!.userId, user.email);
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  /** POST /api/v1/auth/mfa/enable — verify token and enable MFA */
  async enable(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { token } = req.body;
      if (!token) {
        res.status(400).json({ success: false, message: "Verification code is required" });
        return;
      }
      await mfaService.enable(req.user!.userId, token);
      res.json({ success: true, message: "MFA enabled successfully" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  /** POST /api/v1/auth/mfa/disable */
  async disable(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { token } = req.body;
      if (token) {
        await mfaService.verify(req.user!.userId, token);
      }
      await mfaService.disable(req.user!.userId);
      res.json({ success: true, message: "MFA disabled" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  /** POST /api/v1/auth/mfa/verify — used during login challenge */
  async verify(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { userId, token } = req.body;
      if (!userId || !token) {
        res.status(400).json({ success: false, message: "userId and token are required" });
        return;
      }
      await mfaService.verify(userId, token);
      res.json({ success: true, message: "MFA verification successful" });
    } catch (error: any) {
      res.status(401).json({ success: false, message: error.message });
    }
  }
}

export const mfaController = new MfaController();
