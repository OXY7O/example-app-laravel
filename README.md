# OXY7O Demo App Laravel

Consumer referensi minimal untuk memvalidasi profil `php-laravel` pada `platform-workflow v0.1.0` berdasarkan `platform-governance v1.1.0`.

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

Sumber machine-readable berada di `compatibility/php-laravel.json`. Pilot pertama hanya menghasilkan artifact dari PHP 8.3 dan Laravel 13. PHP 8.2, 8.4, dan 8.5 dicatat untuk compatibility-only; PHP 8.6 adalah preview non-blocking; PHP 7.4 hanya boleh digunakan melalui exception dan migration plan.

Eksekusi matrix penuh ditunda sampai `platform-workflow` mendukung job compatibility-only tanpa menghasilkan artifact kedua yang ambigu.

## Hubungan repository

1. `platform-governance` menetapkan policy, lifecycle, control, dan evidence requirement.
2. `platform-workflow` mengimplementasikan reusable CI dan pembuatan artifact.
3. `demo-app-laravel` membuktikan kontrak tersebut dari sisi consumer aplikasi.

Lihat `docs/TRACEABILITY.md` untuk pemetaan kontrol dan `docs/PILOT-RESULT.md` untuk cara mencatat hasil pilot aktual.

## Batas scope

Repository tidak menyimpan credential aplikasi, tidak menggunakan `secrets: inherit`, dan tidak menjalankan deployment. Promotion dan deployment menjadi tahap lanjutan setelah artifact CI dinyatakan valid.
