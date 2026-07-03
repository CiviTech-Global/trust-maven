import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { copilotService } from "../services/copilot.service";
import { controllerWrapper } from "../utils/controllerWrapper";
import { ValidationException, UnauthorizedException } from "../domain.layer/exceptions/custom.exception";

export class CopilotController {
  query = controllerWrapper(
    async (req) => {
      if (!req.user) throw new UnauthorizedException();
      const { q } = req.body;
      if (!q || typeof q !== "string") throw new ValidationException("Query text (q) is required");
      const result = await copilotService.processQuery(req.user.organizationId, q);
      return { status: 200, data: result };
    },
    { functionName: "query", eventType: "Read" }
  );

  getSuggestions = controllerWrapper(
    async (req) => {
      if (!req.user) throw new UnauthorizedException();
      const suggestions = copilotService.getDefaultSuggestions();
      return { status: 200, data: suggestions };
    },
    { functionName: "getSuggestions", eventType: "Read" }
  );
}

export const copilotController = new CopilotController();
