import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const WORKFLOW_SHA = "3cf07e119db0756d780109eaf35d6239f708e8b6";

test("OCI image is immutable, frozen, non-root, and health checked", () => {
  const dockerfile = read("Dockerfile");
  assert.match(dockerfile, /ghcr\.io\/oxy7o\/platform-ci-php@sha256:e406cd0def2e69f3ca9800ab68ede80ad7f3a5fd7b23dc20b1927371d867db69/);
  assert.match(dockerfile, /composer install.*--no-dev/);
  assert.match(dockerfile, /USER app/);
  assert.match(dockerfile, /HEALTHCHECK/);
  assert.match(dockerfile, /\/up/);
});

test("build context excludes mutable and sensitive material", () => {
  const ignored = read(".dockerignore");
  for (const value of [".env", ".git", "vendor", "node_modules", "*.key", "*.pem"]) assert.match(ignored, new RegExp(value.replace("*", "\\*")));
});

test("Compose consumes an immutable supplied image and never builds", () => {
  const compose = read("deploy/compose.yaml");
  assert.match(compose, /APP_IMAGE:\?APP_IMAGE is required/);
  assert.doesNotMatch(compose, /^\s*build:/m);
  assert.doesNotMatch(compose, /password|private.?key|token:/i);
});

test("OCI publication and development deployment callers are thin and immutable", () => {
  const publish = JSON.parse(read(".github/workflows/publish-oci.yml"));
  const deploy = JSON.parse(read(".github/workflows/deploy-development.yml"));
  assert.ok(publish.on.push.branches.includes("development"));
  assert.equal(publish.permissions.contents, "read");
  assert.equal(publish.permissions.packages, "write");
  assert.match(publish.jobs.publish.uses, /build-oci-php-laravel\.yml@[0-9a-f]{40}$/);
  assert.ok(publish.jobs.publish.uses.endsWith(`@${WORKFLOW_SHA}`));
  assert.equal(deploy.permissions.contents, "read");
  assert.equal(deploy.permissions.packages, "read");
  assert.match(deploy.jobs.deploy.uses, /deploy-container-host-development\.yml@[0-9a-f]{40}$/);
  assert.ok(deploy.jobs.deploy.uses.endsWith(`@${WORKFLOW_SHA}`));
  assert.equal(deploy.jobs.deploy.secrets, undefined);
  assert.doesNotMatch(JSON.stringify(deploy), /production|staging|secrets: inherit/i);
});
