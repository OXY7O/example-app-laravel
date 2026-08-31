import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("repository policy declares the governed pilot boundary", () => {
  const policy = JSON.parse(fs.readFileSync("repository-policy.json", "utf8"));
  assert.equal(policy.visibility, "private");
  assert.equal(policy.defaultBranch, "main");
  assert.equal(policy.governanceVersion, "v1.5.1");
  assert.equal(policy.workflowVersion, "pr-17@78bdee3ae513d271cac5c0046972a65528f4fe0a");
  assert.equal(policy.deploymentEnabled, false);
  assert.equal(policy.applicationSecretsRequired, false);
});
