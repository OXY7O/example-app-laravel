# OXY7O Example App Laravel

[![Versi release](https://img.shields.io/badge/release-v0.3.0-0969da?label=Versi%20release)](https://github.com/OXY7O/example-app-laravel/releases/tag/v0.3.0)
[![Status CI](https://github.com/OXY7O/example-app-laravel/actions/workflows/ci.yml/badge.svg)](https://github.com/OXY7O/example-app-laravel/actions/workflows/ci.yml)
![Profil PHP/Laravel](https://img.shields.io/badge/profil-PHP%20%2F%20Laravel-777bb4?label=Profil%20PHP%2FLaravel)
![Contoh implementasi](https://img.shields.io/badge/jenis-example%20implementation-16a34a?label=Contoh%20implementasi)
![Tanpa deployment](https://img.shields.io/badge/deployment-tidak%20tersedia-6b7280?label=Tanpa%20deployment)

Implementasi referensi yang menunjukkan cara repository Laravel memakai reusable CI dari `platform-workflow` dengan kontrol dari `platform-governance`.

Repository private ini sengaja dibuat minimal. Tujuannya bukan menjadi starter production, melainkan contoh yang dapat dibaca, diuji, dan dibandingkan saat sebuah tim mengadopsi profil `php-laravel`.

Mulai dari [landing page profile PHP/Laravel](https://github.com/OXY7O/platform-workflow/blob/main/docs/profiles/php-laravel/README.md) untuk memahami kontrak dan batas platform, kemudian gunakan repository ini untuk melihat implementasinya.

## Apa yang dibuktikan repository ini?

- thin caller dapat memanggil reusable workflow menggunakan full commit SHA;
- canonical lane menguji aplikasi dan menghasilkan tepat satu `application-package`;
- enam compatibility lane wajib menguji Laravel/PHP tanpa menghasilkan artifact;
- preview bersifat opt-in dan non-blocking;
- legacy/EOL memerlukan exception dan migration plan;
- workflow berjalan read-only, tanpa application secret, dan tanpa deployment.

Hasil pilot aktual tersedia di [evidence compatibility pilot](docs/results/2026-08-29-php-laravel-compatibility-pilot.json).

## Peran dalam provisioning

Repository ini adalah permanent compatibility dan certification fixture untuk
profile `php-laravel`. Ia memvalidasi exact workflow SHA, canonical/compatibility
lane, artifact boundary, dan Safe evidence. Source repository ini tidak disalin
atau dipindahkan menjadi repository developer.

Saat `platform-provisioning` tersedia, provisioner menggunakan certification yang
masih valid untuk approved bundle yang sama. Golden path tetap berasal dari
`template-app-php-laravel`. Kombinasi baru atau perubahan behavior menjalani
sandbox validation terlebih dahulu.

Saat ini deployment dan security end-to-end belum tersedia. Karena itu repository
ini belum dapat menerbitkan certification reusable untuk deployment atau security
profile penuh.

## Hubungan dengan repository platform

```text
platform-governance       menetapkan policy, lifecycle, control, dan evidence
        |
platform-workflow         menerapkan reusable CI dan kontrak artifact
        |
example-app-laravel          membuktikan implementasi dari sisi consumer
```

## Cara membaca implementasi

| Lokasi | Yang dapat dipelajari |
|---|---|
| `.github/workflows/ci.yml` | Thin caller, immutable SHA, permissions, canonical job, dan compatibility matrix |
| `compatibility/php-laravel.json` | Versi, lifecycle, execution mode, eligibility, dan blocking behavior |
| `compatibility/laravel-12/` | Source dan lock file independen untuk Laravel 12 |
| `Dockerfile.test` | Runtime test PHP yang dapat dipilih melalui build argument |
| `docs/TRACEABILITY.md` | Hubungan kontrol governance dengan bukti implementasi |
| `docs/PILOT-RESULT.md` | Cara merekam hasil pilot tanpa menyimpan secret |

## Mulai cepat

### Prasyarat

- Git;
- Docker untuk menjalankan pengujian PHP yang konsisten;
- Node.js 24 untuk validasi kontrak repository.

### Jalankan canonical Laravel 13 / PHP 8.3

```bash
docker build --build-arg PHP_VERSION=8.3 -f Dockerfile.test -t example-app-laravel-test:php83 .
docker run --rm -e XDEBUG_MODE=coverage -v "$PWD:/app" -w /app example-app-laravel-test:php83 sh -lc 'composer install --no-interaction --no-progress && composer run test:phpunit'
```

Jalankan dari root repository. Hasil yang diharapkan: dependency terpasang dari
`composer.lock`, lima test lulus, dan coverage memenuhi threshold profile.

### Jalankan compatibility Laravel 12

```bash
docker build --build-arg PHP_VERSION=8.2 -f Dockerfile.test -t example-app-laravel-test:php82 .
docker run --rm -e XDEBUG_MODE=coverage -v "$PWD:/app" -w /app/compatibility/laravel-12 example-app-laravel-test:php82 sh -lc 'composer install --no-interaction --no-progress && composer run test:phpunit'
```

Jalankan dari root repository. Hasil yang diharapkan: Laravel 12 menggunakan
lock file independen, seluruh test lulus, dan tidak ada artifact yang diunggah.

### Validasi kontrol repository

```bash
npm ci
npm test
node scripts/validate-repository.mjs
```

Hasil yang diharapkan: seluruh test kontrol lulus dan validator mencetak
`validated example-app-laravel`.

## Endpoint contoh

| Endpoint | Fungsi |
|---|---|
| `GET /api/health` | Mengembalikan status layanan untuk smoke/integration check |
| `GET /api/examples/{id}` | Mengembalikan resource deterministik untuk pengujian kontrak |

Laravel 12 dan Laravel 13 mempertahankan endpoint contract yang sama agar compatibility test membandingkan perilaku yang setara.

## Matriks versi yang diuji

| Lane | Laravel | PHP | Lifecycle | Blocking | Eligible | Artifact |
|---|---:|---:|---|---|---|---|
| Canonical | 13 | 8.3 | active | Ya | Ya | Tepat satu |
| Compatibility | 13 | 8.4–8.5 | active | Ya | Ya | Tidak |
| Compatibility | 12 | 8.2–8.5 | security-only | Ya | Ya | Tidak |
| Preview | 13 | 8.6 | preview | Tidak | Tidak secara default | Tidak |
| Legacy | 8 | 7.4 | legacy/EOL | Tidak | Hanya exception | Tidak |

Sumber machine-readable yang menjadi acuan adalah `compatibility/php-laravel.json`.

## Artifact yang dihasilkan

Hanya canonical lane Laravel 13/PHP 8.3 yang menghasilkan `application-package`. Artifact tersebut menyertakan manifest dan digest untuk traceability. Compatibility, preview, dan legacy lane hanya menghasilkan status serta safe evidence metadata.

Artifact berstatus `ci-qualified` berarti lolos kontrak CI. Artifact tersebut belum otomatis disetujui untuk promotion atau deployment.

## Cara mengadopsi pola ini melalui provisioning

1. Mulai dari `.github/workflows/ci.yml` dan pertahankan permissions `contents: read`.
2. Ganti identitas kontrak, working directory, coverage threshold, dan retention sesuai aplikasi.
3. Pertahankan reusable workflow pada full commit SHA yang telah disetujui.
4. Buat lock file independen bila versi framework membutuhkan dependency graph berbeda.
5. Catat versi dan lifecycle di compatibility catalogue.
6. Jalankan pilot, simpan safe evidence metadata, lalu tetapkan required check setelah hasilnya stabil.

Jangan menyalin example ini sebagai production starter. Repository aplikasi baru
akan dirender dari template dan approved overlay melalui governed provisioning.

## Onboarding checklist

- [ ] Pastikan workload aplikasi sesuai dengan profile `php-laravel`.
- [ ] Pilih kombinasi Laravel/PHP yang masih diizinkan.
- [ ] Commit `composer.json` dan `composer.lock`.
- [ ] Pelajari `.github/workflows/ci.yml`; gunakan governed provisioning untuk memasang thin caller ketika layanan tersedia.
- [ ] Tetapkan input terkontrol, coverage threshold, dan retention.
- [ ] Pin reusable workflow ke full commit SHA yang disetujui.
- [ ] Jalankan Composer dan test secara lokal.
- [ ] Buka pull request dan tunggu seluruh required check.
- [ ] Verifikasi hanya canonical lane menghasilkan artifact dan digest.
- [ ] Catat safe evidence reference serta owner onboarding.
- [ ] Konfirmasi bahwa `ci-qualified` bukan izin deployment.

## Batasan penting

- Tidak ada credential, environment secret, atau `secrets: inherit`.
- Tidak ada deployment ke development, staging, atau production.
- Tidak ada promotion otomatis setelah merge.
- Preview tidak menjadi blocking gate.
- Legacy/EOL tidak diaktifkan tanpa exception yang masih berlaku.
- Status repository ini masih pilot dan bukan klaim `operationally compliant`.

## Dokumentasi lanjutan

- [Traceability](docs/TRACEABILITY.md)
- [Panduan hasil pilot](docs/PILOT-RESULT.md)
- [Aktivasi preview lane](docs/PREVIEW-LANE-ACTIVATION.md)
- [Exception legacy lane](docs/LEGACY-LANE-EXCEPTION.md)
- [Profile PHP/Laravel](https://github.com/OXY7O/platform-workflow/blob/main/docs/profiles/php-laravel/README.md)
- [Riwayat perubahan](CHANGELOG.md)
- [Release v0.3.0](https://github.com/OXY7O/example-app-laravel/releases/tag/v0.3.0)
