import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { metaframeworkController } from "../controllers/metaframework.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

// Common Controls
router.get("/controls", (req, res) => metaframeworkController.listCommonControls(req, res));
router.get("/controls/domains", (req, res) => metaframeworkController.listDomains(req, res));
router.get("/controls/:id", (req, res) => metaframeworkController.getCommonControl(req, res));

// STRM Mappings
router.get("/mappings/by-requirement/:requirementId", (req, res) =>
  metaframeworkController.getMappingsForRequirement(req, res)
);
router.get("/mappings/by-control/:controlId", (req, res) =>
  metaframeworkController.getMappingsForControl(req, res)
);

// Per-Organization Implementation
router.get("/implementations", (req, res) =>
  metaframeworkController.getImplementations(req, res)
);
router.put("/implementations/:controlId", (req, res) =>
  metaframeworkController.updateImplementation(req, res)
);

// Jumpstart Coverage
router.get("/jumpstart/:regulationId", (req, res) =>
  metaframeworkController.getJumpstartCoverage(req, res)
);

// Workflow Transitions
router.get("/workflow/transitions", (req, res) =>
  metaframeworkController.getWorkflowStatus(req, res)
);

// Unified Compliance
router.get("/unified-compliance", (req, res) =>
  metaframeworkController.getUnifiedCompliance(req, res)
);

export default router;
