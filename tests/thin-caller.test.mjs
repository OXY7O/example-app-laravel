import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const WORKFLOW_SHA = "78bdee3ae513d271cac5c0046972a65528f4fe0a";

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
  assert.equal(contract.governanceVersion, "v1.5.1");
  assert.equal(contract.catalogueVersion, "1.4.0");
  assert.equal(contract.phpVersion, "8.3");
  assert.equal(contract.artifactType, "application-package");
  assert.equal(contract.coverageThreshold, undefined);
  assert.equal(job.with["coverage-threshold"], undefined);
});

test("caller separates canonical artifact and compatibility matrix",()=>{const workflow=JSON.parse(fs.readFileSync(".github/workflows/ci.yml","utf8"));assert.ok(workflow.jobs["canonical-artifact"]);assert.ok(workflow.jobs["prepare-compatibility"]);assert.ok(workflow.jobs.compatibility.strategy.matrix);assert.equal(workflow.jobs.compatibility.secrets,undefined);});

test("example-owned CI jobs use only the platform-ci self-hosted runner", () => {
  for (const file of [".github/workflows/ci.yml", ".github/workflows/validate-demo-repository.yml"]) {
    const workflow = JSON.parse(fs.readFileSync(file, "utf8"));
    for (const [jobId, job] of Object.entries(workflow.jobs)) {
      if (!job["runs-on"]) continue;
      assert.deepEqual(job["runs-on"], ["self-hosted", "platform-ci"], `${file}: ${jobId}`);
    }
  }
});
