# OXY7O Demo App Laravel

Consumer referensi minimal untuk memvalidasi profil `php-laravel` pada `platform-workflow v0.2.0` berdasarkan `platform-governance v1.1.0`.

Repository private ini membuktikan CI, pengujian, compatibility metadata, dan handoff `application-package`. Repository ini bukan starter production dan tidak menjalankan deployment.

## Endpoint

- `GET /api/health` mengembalikan status layanan.
- `GET /api/examples/{id}` mengembalikan resource deterministik untuk validasi integrasi.

## Menjalankan secara lokal

Gunakan image test agar versi PHP dan extension konsisten:

```bash
docker build -f Dockerfile.test -t demo-app-laravel-test:php83 .
docker run --rm -e XDEBUG_MODE=coverage -v "$PWD:/app" -w /app demo-app-laravel-test:php83 sh -lc 'composer install --no-interaction --no-progress && composer run test:phpunit'
```

Pengujian kontrol repository dijalankan dengan:

```bash
npm ci
npm test
node scripts/validate-repository.mjs
```

## Lifecycle kompatibilitas

Sumber machine-readable berada di `compatibility/php-laravel.json`. Laravel 13/PHP 8.3 adalah canonical lane dan satu-satunya penghasil artifact. Enam lane wajib memeriksa Laravel 12 pada PHP 8.2–8.5 dan Laravel 13 pada PHP 8.4–8.5 tanpa menghasilkan artifact. PHP 8.6 tetap preview non-blocking dan PHP 7.4 hanya melalui exception serta migration plan.

## Hubungan repository

1. `platform-governance` menetapkan policy, lifecycle, control, dan evidence requirement.
2. `platform-workflow` mengimplementasikan reusable CI dan pembuatan artifact.
3. `demo-app-laravel` membuktikan kontrak tersebut dari sisi consumer aplikasi.

Lihat `docs/TRACEABILITY.md` untuk pemetaan kontrol, `docs/PILOT-RESULT.md` untuk panduan pencatatan, dan `docs/results/2026-08-29-php-laravel-pilot.json` untuk hasil pilot pertama yang telah lulus.

## Batas scope

Repository tidak menyimpan credential aplikasi, tidak menggunakan `secrets: inherit`, dan tidak menjalankan deployment. Promotion dan deployment menjadi tahap lanjutan setelah artifact CI dinyatakan valid.
