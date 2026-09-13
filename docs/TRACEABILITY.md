# Traceability Pilot Laravel

Dokumen ini menghubungkan tujuan pilot dengan kontrol, pengujian, dan evidence.
Evidence aktual yang tercatat saat ini hanya mencakup CI dan artifact. OCI serta
deployment development sudah diimplementasikan sebagai kandidat pilot, tetapi
belum diklaim terverifikasi sampai pengujian environment selesai.

| Kriteria | Kontrol atau pengujian | Evidence aktual |
|---|---|---|
| Repository mengikuti baseline governance | `repository-policy.json` dan `tests/repository-policy.test.mjs` | `sourceSha` |
| Runtime canonical adalah PHP 8.3 | `compatibility/php-laravel.json` dan `tests/compatibility-catalogue.test.mjs` | `profileKey`, `contractDigest` |
| API minimal berfungsi | PHPUnit unit dan feature test | GitHub Actions run pada `runUrl` |
| Coverage minimal 80% | Composer script `test:phpunit` | Status reusable workflow |
| Workflow immutable dan tanpa secret | `tests/thin-caller.test.mjs` | `workflowSha`, `workflowReferenceSha` |
| Artifact lolos verifikasi | Output reusable workflow | Object `artifact` dan `readiness` |
| OCI publication terkontrol | `Dockerfile`, `publish-oci.yml`, immutable digest | Pending actual pilot |
| Deployment development terkontrol | `deploy/compose.yaml`, `deploy-development.yml`, LKG rollback | Pending actual pilot |
| Gap tercatat dan dapat ditindaklanjuti | Review hasil pilot | Array `gaps` |

Evidence eksternal yang sensitif disimpan pada evidence storage yang ditetapkan governance. Repository hanya menyimpan metadata dan referensinya.
