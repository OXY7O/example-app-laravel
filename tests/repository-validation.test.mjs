import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";

test("repository validator accepts the governed example", () => {
  const result = spawnSync("node", ["scripts/validate-repository.mjs"], { encoding: "utf8" });

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /validated example-app-laravel/);
});
