const fs = require("fs");
const path = require("path");

const oscalDir = path.join(__dirname, "..", "structures", "oscal");
const files = fs.readdirSync(oscalDir).filter(f => f.endsWith(".json"));

let success = 0;
let failed = 0;

for (const file of files) {
  try {
    const content = fs.readFileSync(path.join(oscalDir, file), "utf-8");
    const json = JSON.parse(content);

    const catalog = json.catalog || json["oscal:catalog"] || json;
    if (!catalog.metadata) throw new Error("Missing metadata");
    if (!catalog.groups && !catalog.controls) throw new Error("Missing groups or controls");

    const controls = catalog.groups || catalog.controls || [];
    let totalControls = 0;
    const countControls = (items) => {
      for (const c of items) {
        totalControls++;
        if (c.controls) countControls(c.controls);
        if (c.subcontrols) countControls(c.subcontrols);
      }
    };
    countControls(controls);

    console.log(`✓ ${file}: ${catalog.metadata.title} (${totalControls} controls)`);
    success++;
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`);
    failed++;
  }
}

console.log(`\n${success} valid, ${failed} invalid`);
