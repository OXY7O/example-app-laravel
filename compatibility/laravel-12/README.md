# Compatibility Lane Laravel 12

Direktori ini berisi aplikasi Laravel 12 yang dipakai khusus untuk menguji compatibility lane pada PHP 8.2, 8.3, 8.4, dan 8.5.

## Mengapa source dan lock file dipisahkan?

Laravel 12 memiliki dependency graph yang berbeda dari canonical Laravel 13. Source minimal dan `composer.lock` independen memastikan setiap lane menguji dependency yang benar-benar dibekukan, bukan hasil resolusi ulang saat workflow berjalan.

Endpoint contract tetap sama dengan canonical application:

- `GET /api/health`;
- `GET /api/examples/{id}`.

## Peran lane ini

- lifecycle: `security-only`;
- execution mode: `compatibility-only`;
- blocking: `true`;
- menghasilkan artifact: tidak;
- menerima application secret: tidak.

Konfigurasi resminya berada di `../php-laravel.json`. Jangan mengubah versi atau eligibility hanya dari direktori ini.

## Menjalankan secara lokal

Dari root repository:

```bash
docker build --build-arg PHP_VERSION=8.2 -f Dockerfile.test -t demo-app-laravel-test:php82 .
docker run --rm -e XDEBUG_MODE=coverage -v "$PWD:/app" -w /app/compatibility/laravel-12 demo-app-laravel-test:php82 sh -lc 'composer install --no-interaction --no-progress && composer run test:phpunit'
```

Ulangi dengan versi PHP lain yang tercantum pada catalogue.

## Batasan

- Jangan menjalankan deployment dari compatibility lane.
- Jangan mengunggah `application-package` dari lane ini.
- Jangan menambahkan secret atau `secrets: inherit`.
- Jangan memperbarui `composer.lock` tanpa review compatibility matrix dan bukti pengujian ulang.

Untuk konteks lengkap, kembali ke [README repository](../../README.md).
