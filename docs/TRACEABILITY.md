# Traceability Pilot Laravel

Dokumen ini menghubungkan tujuan pilot dengan kontrol, pengujian, dan evidence.
Evidence aktual yang tercatat saat ini hanya mencakup CI dan artifact. OCI
dipublikasikan dari boundary publik, sedangkan deployment hanya boleh dijalankan
oleh control plane privat dan belum diklaim terverifikasi.

| Kriteria | Kontrol atau pengujian | Evidence aktual |
|---|---|---|
| Repository mengikuti baseline governance | `repository-policy.json` dan `tests/repository-policy.test.mjs` | `sourceSha` |
| Runtime canonical adalah PHP 8.3 | `compatibility/php-laravel.json` dan `tests/compatibility-catalogue.test.mjs` | `profileKey`, `contractDigest` |
| API minimal berfungsi | PHPUnit unit dan feature test | GitHub Actions run pada `runUrl` |
| Coverage minimal 80% | Composer script `test:phpunit` | Status reusable workflow |
| Workflow immutable dan tanpa secret | `tests/thin-caller.test.mjs` | `workflowSha`, `workflowReferenceSha` |
| Artifact lolos verifikasi | Output reusable workflow | Object `artifact` dan `readiness` |
| OCI publication terkontrol | `Dockerfile`, `publish-oci.yml`, immutable digest | Pending actual pilot |
| Penyerahan ke delivery privat | OCI digest, provenance, source SHA, workflow SHA | Pending actual pilot di `platform-provisioning` |
| Gap tercatat dan dapat ditindaklanjuti | Review hasil pilot | Array `gaps` |

Evidence eksternal yang sensitif disimpan pada evidence storage yang ditetapkan governance. Repository hanya menyimpan metadata dan referensinya.
