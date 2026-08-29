# Traceability Pilot Laravel

Dokumen ini menghubungkan tujuan pilot dengan kontrol, pengujian, dan evidence yang dihasilkan. Repository ini hanya memvalidasi CI dan artifact; deployment tidak termasuk scope.

| Kriteria | Kontrol atau pengujian | Evidence aktual |
|---|---|---|
| Repository mengikuti baseline governance | `repository-policy.json` dan `tests/repository-policy.test.mjs` | `sourceSha` |
| Runtime canonical adalah PHP 8.3 | `compatibility/php-laravel.json` dan `tests/compatibility-catalogue.test.mjs` | `profileKey`, `contractDigest` |
| API minimal berfungsi | PHPUnit unit dan feature test | GitHub Actions run pada `runUrl` |
| Coverage minimal 80% | Composer script `test:phpunit` | Status reusable workflow |
| Workflow immutable dan tanpa secret | `tests/thin-caller.test.mjs` | `workflowSha` |
| Artifact lolos verifikasi | Output reusable workflow | Object `artifact` dan `readiness` |
| Tidak ada deployment | Policy, workflow, dan validator repository | `deploymentExecuted=false` |
| Gap tercatat dan dapat ditindaklanjuti | Review hasil pilot | Array `gaps` |

Evidence eksternal yang sensitif disimpan pada evidence storage yang ditetapkan governance. Repository hanya menyimpan metadata dan referensinya.
