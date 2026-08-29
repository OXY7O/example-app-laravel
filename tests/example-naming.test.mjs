import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const activeFiles = (entry) => {
  if (entry === "docs/results") return [];
  const stat = fs.statSync(entry);
  if (stat.isFile()) return [entry];
  return fs.readdirSync(entry).flatMap((name) => activeFiles(`${entry}/${name}`));
};

test("package and repository policy use the example identity", () => {
  const packageDocument = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const policy = JSON.parse(fs.readFileSync("repository-policy.json", "utf8"));

  assert.equal(packageDocument.name, "@oxy7o/example-app-laravel");
  assert.equal(policy.repositoryName, "example-app-laravel");
});

test("active repository content does not use the old demo identity", () => {
  const files = [
    "README.md",
    "compatibility",
    "docs",
    "package.json",
    "package-lock.json",
    "repository-policy.json",
    "scripts",
  ].flatMap(activeFiles);
  const matches = files.filter((file) =>
    /demo-app-laravel|Demo App Laravel/.test(fs.readFileSync(file, "utf8")),
  );

  assert.deepEqual(matches, []);
});

test("active links point to the profile and canonical example repository", () => {
  const readme = fs.readFileSync("README.md", "utf8");
  const schema = JSON.parse(fs.readFileSync("docs/pilot-result.schema.json", "utf8"));
  const validator = fs.readFileSync("scripts/validate-repository.mjs", "utf8");

  assert.match(readme, /platform-workflow\/blob\/main\/docs\/profiles\/php-laravel\/README\.md/);
  assert.match(readme, /OXY7O\/example-app-laravel/);
  assert.match(schema.$id, /OXY7O\/example-app-laravel/);
  assert.match(validator, /validated example-app-laravel/);
});
