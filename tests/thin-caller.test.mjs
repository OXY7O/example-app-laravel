import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const WORKFLOW_SHA = "1ba98458839689a441ef06c2c6290466b1ad9274";

test("caller is immutable, read-only, and secretless", () => {
  const workflow = JSON.parse(fs.readFileSync(".github/workflows/ci.yml", "utf8"));
  const job = workflow.jobs["php-laravel-ci"];

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
