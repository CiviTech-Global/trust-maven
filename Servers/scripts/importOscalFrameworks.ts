import { Sequelize } from "sequelize-typescript";
import fs from "fs";
import path from "path";
import { frameworkImportService } from "../services/frameworkImport.service";
import { RegulationDefinition } from "../domain.layer/models/regulationDefinition/regulationDefinition.model";
import { RegulationRequirement } from "../domain.layer/models/regulationRequirement/regulationRequirement.model";

async function main() {
  const sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    database: process.env.DB_NAME || "trust-maven",
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    logging: false,
    models: [RegulationDefinition, RegulationRequirement],
  });

  await sequelize.authenticate();
  console.log("Database connected");

  const oscalDir = path.join(__dirname, "..", "structures", "oscal");
  const files = fs.readdirSync(oscalDir).filter((f) => f.endsWith(".json"));

  console.log(`Found ${files.length} OSCAL files to import`);

  for (const file of files) {
    try {
      const filePath = path.join(oscalDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const oscalJson = JSON.parse(raw);

      console.log(`Importing ${file}...`);
      const seed = await frameworkImportService.importFromOscal(oscalJson);
      await frameworkImportService.saveImportedFramework(seed);
      console.log(`  ✓ ${seed.name} (${seed.code}) imported with ${seed.requirements.length} requirements`);
    } catch (error: any) {
      console.error(`  ✗ ${file}: ${error.message}`);
    }
  }

  await sequelize.close();
  console.log("\nImport complete");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
