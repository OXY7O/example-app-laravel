import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("public OCI pilot binds source, workflow, digest, SBOM, and attestation", () => {
  const result = JSON.parse(fs.readFileSync("docs/results/2026-09-14-public-oci-pilot.json", "utf8"));
  assert.equal(result.status, "passed-with-follow-up");
  assert.equal(result.runner, "GitHub-hosted ubuntu-24.04");
  assert.match(result.sourceSha, /^[0-9a-f]{40}$/);
  assert.match(result.workflowSha, /^[0-9a-f]{40}$/);
  assert.match(result.imageDigest, /^sha256:[0-9a-f]{64}$/);
  assert.equal(result.imageReference.endsWith(`@${result.imageDigest}`), true);
  assert.match(result.attestationUrl, /^https:\/\/github\.com\/OXY7O\/example-app-laravel\/attestations\/[0-9]+$/);
  assert.equal(result.sbomAttached, true);
  assert.equal(result.attestationVerified, true);
  assert.equal(result.deploymentExecuted, false);
  assert.doesNotMatch(JSON.stringify(result), /private.?key|known.?hosts|target.?host|username|password|token/i);
});
