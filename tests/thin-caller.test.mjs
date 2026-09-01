import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const WORKFLOW_SHA = "794adea605b09f4f0330872ab66164369ec39e96";

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

test("example-owned CI jobs use immutable job containers", () => {
  const caller = JSON.parse(fs.readFileSync(".github/workflows/ci.yml", "utf8"));
  const validator = JSON.parse(fs.readFileSync(".github/workflows/validate-demo-repository.yml", "utf8"));
  assert.equal(
    caller.jobs["prepare-compatibility"].container.image,
    "node:24-bookworm@sha256:be23f54a88d34e8824c741b19b91064094f92c1c97b194144bfc8b50d67258e2",
  );
  assert.equal(
    validator.jobs["validate-demo-repository"].container.image,
    "php:8.3-cli-bookworm@sha256:177529735599a8244b2c903522f029839dce1c2ac4be122fdc00ada4b45a20e4",
  );
});

test("example repository validation uses persistent isolated dependency caches", () => {
  const validator = JSON.parse(fs.readFileSync(".github/workflows/validate-demo-repository.yml", "utf8"));
  const job = validator.jobs["validate-demo-repository"];
  assert.equal(job.env.COMPOSER_CACHE_DIR, "/var/cache/platform/composer");
  assert.equal(job.env.NPM_CONFIG_CACHE, "/var/cache/platform/npm");
  assert.deepEqual(job.container.volumes, [
    "platform-ci-composer-php-8.3:/var/cache/platform/composer",
    "platform-ci-npm-node-24:/var/cache/platform/npm",
  ]);
  const setupNode = job.steps.find((step) => step.name === "Configure Node.js");
  assert.equal(setupNode.with.cache, undefined);
});
