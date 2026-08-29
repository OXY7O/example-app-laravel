## Ringkasan

- Menambahkan Laravel API minimal sebagai consumer referensi profile `php-laravel`.
- Menggunakan `platform-governance v1.1.0` dan `platform-workflow v0.1.1` yang dipin ke full commit SHA.
- Menjalankan canonical CI pada PHP 8.3 dengan coverage minimum 80% dan artifact retention 14 hari.

## Lifecycle kompatibilitas

- Canonical artifact: PHP 8.3 / Laravel 13.
- Compatibility-only terencana: PHP 8.2, 8.4, dan 8.5.
- Preview non-blocking: PHP 8.6.
- Legacy exception-only: PHP 7.4.

## Batas pilot

- [x] CI dan artifact
- [x] Evidence metadata aman
- [x] Tanpa secret aplikasi
- [x] Tanpa deployment
- [ ] Hasil pilot aktual dicatat setelah seluruh check selesai

## Validasi

- [ ] Self-validation hijau
- [ ] Reusable Laravel CI hijau
- [ ] Artifact dan manifest terverifikasi
- [ ] Tidak ada gap blocking
