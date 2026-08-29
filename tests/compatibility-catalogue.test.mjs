import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("compatibility catalogue separates support lifecycle from execution", () => {
  const data = JSON.parse(fs.readFileSync("compatibility/php-laravel.json", "utf8"));

  assert.equal(data.lanes.find((item) => item.laneId === "laravel-13-php-8.3").executionMode, "canonical-artifact");
  assert.equal(data.lanes.find((item) => item.phpVersion === "7.4").lifecycle, "legacy-eol");
  assert.equal(data.lanes.find((item) => item.phpVersion === "8.6").blocking, false);
  assert.equal(data.lanes.filter((lane) => lane.blocking && lane.executionMode === "compatibility-only").length, 6);
});

test("every runtime uses a controlled lifecycle and execution mode", () => {
  const data = JSON.parse(fs.readFileSync("compatibility/php-laravel.json", "utf8"));
  const lifecycles = new Set(["active", "security-only", "preview", "legacy-eol"]);
  const executionModes = new Set(["canonical-artifact", "compatibility-only", "exception-only"]);

  for (const runtime of data.lanes) {
    assert.equal(lifecycles.has(runtime.lifecycle), true, `invalid lifecycle for PHP ${runtime.phpVersion}`);
    assert.equal(executionModes.has(runtime.executionMode), true, `invalid execution mode for PHP ${runtime.phpVersion}`);
  }
});
