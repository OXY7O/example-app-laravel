import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("pilot example records traceability without secret values", () => {
  const result = JSON.parse(fs.readFileSync("docs/examples/pilot-result.example.json", "utf8"));

  assert.equal(result.profileKey, "php-laravel");
  assert.equal(result.deploymentExecuted, false);
  assert.match(result.workflowSha, /^[a-f0-9]{40}$/);
  assert.match(result.workflowReferenceSha, /^[a-f0-9]{40}$/);
  assert.equal(JSON.stringify(result).toLowerCase().includes("token"), false);
  assert.equal(result.status, "awaiting-execution");
});

test("compatibility pilot records six passing lanes and one artifact",()=>{const result=JSON.parse(fs.readFileSync("docs/results/2026-08-29-php-laravel-compatibility-pilot.json","utf8"));assert.equal(result.status,"passed");assert.equal(result.requiredLanesPassed,6);assert.equal(result.canonicalArtifactCount,1);assert.equal(result.deploymentExecuted,false);assert.deepEqual(result.gaps,[]);});
