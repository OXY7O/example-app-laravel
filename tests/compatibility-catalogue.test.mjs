import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("compatibility catalogue separates support lifecycle from execution", () => {
  const data = JSON.parse(fs.readFileSync("compatibility/php-laravel.json", "utf8"));

  assert.equal(data.canonical.php, "8.3");
  assert.equal(data.canonical.executionMode, "canonical-artifact");
  assert.equal(data.runtimes.find((item) => item.php === "7.4").lifecycle, "legacy-eol");
  assert.equal(data.runtimes.find((item) => item.php === "8.6").blocking, false);
  assert.equal(data.matrixExpansion.status, "planned");
});

test("every runtime uses a controlled lifecycle and execution mode", () => {
  const data = JSON.parse(fs.readFileSync("compatibility/php-laravel.json", "utf8"));
  const lifecycles = new Set(["active", "security-only", "preview", "legacy-eol"]);
  const executionModes = new Set(["canonical-artifact", "compatibility-only", "exception-only"]);

  for (const runtime of data.runtimes) {
    assert.equal(lifecycles.has(runtime.lifecycle), true, `invalid lifecycle for PHP ${runtime.php}`);
    assert.equal(executionModes.has(runtime.executionMode), true, `invalid execution mode for PHP ${runtime.php}`);
  }
});
