# Panduan Hasil Pilot Laravel

Gunakan `docs/examples/pilot-result.example.json` sebagai acuan struktur, bukan sebagai record aktual. Setelah check pada pull request selesai, buat file baru di `docs/results/YYYY-MM-DD-php-laravel-pilot.json` dan isi dari output GitHub Actions.

## Data yang dicatat

1. Salin source SHA, implementation workflow SHA, caller workflow reference SHA, URL run, contract digest, readiness, dan failure category dari run aktual.
2. Catat metadata artifact: ID, nama, digest, manifest digest, ukuran, dan waktu kedaluwarsa.
3. Simpan hanya referensi evidence eksternal. Jangan menyalin log mentah, isi environment, credential, secret, atau data aplikasi.
4. Catat setiap gap dengan ID, kategori, deskripsi, fungsi pemilik, dan target rilis.
5. Tetapkan status `passed` hanya jika seluruh check wajib hijau dan tidak ada gap blocking.

File example selalu dipertahankan dengan status `awaiting-execution`. Riwayat hasil aktual tidak ditimpa agar jejak pilot tetap dapat diaudit.
