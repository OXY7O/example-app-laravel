import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const WORKFLOW_SHA = "6cd3458cceec36d738265a8b5ebefa5d4e19766c";

test("caller is immutable, read-only, and secretless", () => {
  const workflow = JSON.parse(fs.readFileSync(".github/workflows/ci.yml", "utf8"));
  const job = workflow.jobs["canonical-artifact"];

  assert.equal(workflow.permissions.contents, "read");
  assert.equal(
    job.uses,
    `OXY7O/platform-workflow/.github/workflows/ci-profile-php-laravel.yml@${WORKFLOW_SHA}`,
  );
  assert.equal(job.secrets, undefined);

  const contract = JSON.parse(job.with["contract-json"]);
  assert.equal(contract.phpVersion, "8.3");
  assert.equal(contract.artifactType, "application-package");
  assert.equal(contract.coverageThreshold, 80);
});

test("caller separates canonical artifact and compatibility matrix",()=>{const workflow=JSON.parse(fs.readFileSync(".github/workflows/ci.yml","utf8"));assert.ok(workflow.jobs["canonical-artifact"]);assert.ok(workflow.jobs["prepare-compatibility"]);assert.ok(workflow.jobs.compatibility.strategy.matrix);assert.equal(workflow.jobs.compatibility.secrets,undefined);});
