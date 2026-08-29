import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const ignoredDirectories = new Set([".git", "node_modules", "vendor"]);

function filesBelow(directory) {
  const files = [];

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (ignoredDirectories.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...filesBelow(absolute));
    else files.push(absolute);
  }

  return files;
}

function relative(file) {
  return path.relative(root, file).split(path.sep).join("/");
}

function visit(value, callback, key = "") {
  callback(value, key);
  if (Array.isArray(value)) {
    for (const item of value) visit(item, callback, key);
  } else if (value && typeof value === "object") {
    for (const [childKey, childValue] of Object.entries(value)) {
      visit(childValue, callback, childKey);
    }
  }
}

const allFiles = filesBelow(root);
const jsonFiles = allFiles.filter((file) => file.endsWith(".json"));
for (const file of jsonFiles) {
  JSON.parse(fs.readFileSync(file, "utf8"));
}

const workflowFiles = allFiles.filter((file) => relative(file).startsWith(".github/workflows/") && /\.ya?ml$/.test(file));
assert.ok(workflowFiles.length > 0, "at least one workflow is required");

for (const file of workflowFiles) {
  const workflow = JSON.parse(fs.readFileSync(file, "utf8"));
  for (const jobName of Object.keys(workflow.jobs ?? {})) {
    assert.equal(/deploy/i.test(jobName), false, `deployment job is not allowed: ${jobName}`);
  }
  visit(workflow, (value, key) => {
    assert.notEqual(value, "inherit", `secrets: inherit is not allowed in ${relative(file)}`);
    if (key === "uses" && typeof value === "string" && !value.startsWith("./")) {
      assert.match(value, /@[a-f0-9]{40}$/, `external action must use a full SHA: ${value}`);
    }
  });
}

for (const requiredFile of ["composer.lock", "artisan", "bootstrap/app.php"]) {
  assert.equal(fs.existsSync(requiredFile), true, `missing required Laravel file: ${requiredFile}`);
}

const catalogue = JSON.parse(fs.readFileSync("compatibility/php-laravel.json", "utf8"));
const caller = JSON.parse(fs.readFileSync(".github/workflows/ci.yml", "utf8"));
const contract = JSON.parse(caller.jobs["canonical-artifact"].with["contract-json"]);
assert.equal(contract.profileKey, catalogue.profileKey, "profile key differs from catalogue");
const canonical = catalogue.lanes.find((lane) => lane.executionMode === "canonical-artifact");
assert.equal(contract.phpVersion, canonical.phpVersion, "canonical PHP differs from caller");
assert.equal(catalogue.lanes.filter((lane) => lane.blocking && lane.executionMode === "compatibility-only").length, 6, "six blocking compatibility lanes are required");
for (const lane of catalogue.lanes.filter((item) => item.eligible && item.executionMode === "compatibility-only")) {
  assert.equal(fs.existsSync(path.join(lane.workingDirectory, "composer.lock")), true, `missing frozen lock for ${lane.laneId}`);
}
assert.equal(caller.jobs.compatibility.secrets, undefined, "compatibility caller must not receive secrets");

const repositoryFiles = execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard"], { encoding: "utf8" })
  .trim()
  .split("\n")
  .filter(Boolean);

for (const file of repositoryFiles) {
  const basename = path.basename(file);
  const forbidden = (
    (basename.startsWith(".env") && basename !== ".env.example") ||
    /\.(pem|key)$/i.test(basename) ||
    /^id_rsa/i.test(basename)
  );
  assert.equal(forbidden, false, `sensitive file must not be tracked: ${file}`);
}

console.log(`validated demo-app-laravel (${jsonFiles.length} JSON files, ${workflowFiles.length} workflows)`);
