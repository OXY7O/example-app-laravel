import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const WORKFLOW_SHA = "f44d14af44052e3f2e45238828b121b9c5e9d0a7";

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

test("OCI publication caller is thin, immutable, and contains no deployment authority", () => {
  const publish = JSON.parse(read(".github/workflows/publish-oci.yml"));
  assert.ok(publish.on.push.branches.includes("development"));
  assert.equal(publish.permissions.contents, "read");
  assert.equal(publish.permissions.packages, "write");
  assert.match(publish.jobs.publish.uses, /build-oci-php-laravel\.yml@[0-9a-f]{40}$/);
  assert.ok(publish.jobs.publish.uses.endsWith(`@${WORKFLOW_SHA}`));
  assert.doesNotMatch(JSON.stringify(publish), /self-hosted|platform-ci|DEPLOY_|SSH_|KUBECONFIG|secrets: inherit/i);
  assert.equal(fs.existsSync(".github/workflows/deploy-development.yml"), false);
});
