import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");

test("README explains the governed Laravel example for adopters", () => {
  const readme = read("README.md");

  for (const text of [
    "Versi kandidat",
    "Status CI",
    "Profil PHP/Laravel",
    "Contoh implementasi",
    "Deployment pilot",
    "Apa yang dibuktikan repository ini?",
    "Cara membaca implementasi",
    "Mulai cepat",
    "Matriks versi yang diuji",
    "Artifact yang dihasilkan",
    "OCI dan deployment development",
    "Cara mengadopsi pola ini",
    "Batasan penting",
  ]) {
    assert.match(readme, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.match(readme, /releases\/tag\/v0\.3\.0/);
  assert.match(readme, /actions\/workflows\/ci\.yml/);
});

test("Laravel 12 compatibility README contains only lane-specific guidance", () => {
  const readme = read("compatibility/laravel-12/README.md");
  assert.match(readme, /Compatibility Lane Laravel 12/);
  assert.match(readme, /Jangan menjalankan deployment/);
  assert.doesNotMatch(readme, /Laravel Sponsors/);
  assert.doesNotMatch(readme, /Learning Laravel/);
});

test("v0.2.1 release note explains documentation impact without changing CI", () => {
  const changelog = read("CHANGELOG.md");
  assert.match(changelog, /## \[0\.2\.1\]/);
  assert.match(changelog, /Dampak bagi pengguna/);
  assert.match(changelog, /Cara mengadopsi/);
  assert.match(changelog, /Tidak ada perubahan perilaku CI/);
});
