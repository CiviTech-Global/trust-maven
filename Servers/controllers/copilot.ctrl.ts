import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { copilotService } from "../services/copilot.service";

export class CopilotController {
  async query(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) { res.status(401).json({ success: false, message: "Unauthorized" }); return; }
      const { q } = req.body;
      if (!q || typeof q !== "string") {
        res.status(400).json({ success: false, message: "Query text (q) is required" });
        return;
      }
      const result = await copilotService.processQuery(req.user.organizationId, q);
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getSuggestions(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) { res.status(401).json({ success: false, message: "Unauthorized" }); return; }
      const suggestions = copilotService.getDefaultSuggestions();
      res.json({ success: true, data: suggestions });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export const copilotController = new CopilotController();
