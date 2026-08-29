import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("repository policy declares the governed pilot boundary", () => {
  const policy = JSON.parse(fs.readFileSync("repository-policy.json", "utf8"));
  assert.equal(policy.visibility, "private");
  assert.equal(policy.defaultBranch, "main");
  assert.equal(policy.governanceVersion, "v1.1.0");
  assert.equal(policy.workflowVersion, "v0.1.1");
  assert.equal(policy.deploymentEnabled, false);
  assert.equal(policy.applicationSecretsRequired, false);
});
