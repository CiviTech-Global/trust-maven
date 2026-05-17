import { ISO27001_SEED } from "./iso27001.seed";
import { NIST_CSF_2_SEED } from "./nist-csf-2.seed";
import { SOC2_SEED } from "./soc2.seed";
import { GDPR_SEED } from "./gdpr.seed";
import { ISO31000_SEED } from "./iso31000.seed";
import { SOX_SEED } from "./sox.seed";
import { CROSS_MAPPINGS_SEED } from "./cross-mappings.seed";

export {
  ISO27001_SEED,
  NIST_CSF_2_SEED,
  SOC2_SEED,
  GDPR_SEED,
  ISO31000_SEED,
  SOX_SEED,
  CROSS_MAPPINGS_SEED,
};

export type { RegulationSeed, RequirementSeed, CrossMappingSeed } from "./types";

export const ALL_REGULATION_SEEDS = [
  ISO27001_SEED,
  NIST_CSF_2_SEED,
  SOC2_SEED,
  GDPR_SEED,
  ISO31000_SEED,
  SOX_SEED,
];
