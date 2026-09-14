import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("repository policy declares the governed pilot boundary", () => {
  const policy = JSON.parse(fs.readFileSync("repository-policy.json", "utf8"));
  assert.equal(policy.visibility, "public");
  assert.equal(policy.defaultBranch, "main");
  assert.equal(policy.governanceVersion, "v1.5.0");
  assert.equal(policy.workflowVersion, "v0.7.0-candidate");
  assert.equal(policy.deploymentEnabled, "private-control-plane");
  assert.deepEqual(policy.deploymentScope, []);
  assert.equal(policy.applicationSecretsRequired, false);
  assert.equal(policy.secretScope, null);
});
