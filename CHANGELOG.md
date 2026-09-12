# Changelog

Seluruh perubahan penting pada repository ini dicatat di dokumen ini.

## [0.4.0] - 2026-09-12

### Diubah

- mem-pin seluruh Laravel workflow dan compatibility action ke
  `platform-workflow@1d51c025059c9bc3bca4fd2ed6c09b9627129399`;
- memvalidasi canonical Laravel CI menggunakan runtime `php-ci/8.3` dari
  `platform-runtime-images@v0.1.1` dengan digest GHCR immutable;
- menyelaraskan kontrak ke `platform-governance@v1.5.0` dan catalogue `1.2.0`.

### Batas

- perubahan hanya mencakup CI, artifact, dan evidence; deployment tetap tidak
  tersedia dan tidak ada secret atau permission baru.

## [0.3.0] - 2026-08-29

### Ditambahkan

- onboarding checklist dari pemilihan profile sampai pencatatan safe evidence;
- hasil yang diharapkan untuk canonical lane, compatibility lane, dan validator;
- navigasi langsung menuju profile PHP/Laravel di `platform-workflow`.

### Diubah

- nama canonical repository dari `demo-app-laravel` menjadi
  `example-app-laravel`;
- identitas package, repository policy, schema, dokumentasi, dan validator
  diselaraskan dengan nama canonical baru;
- governance baseline diperbarui ke `platform-governance@v1.2.0`.

### Migrasi

- gunakan URL `https://github.com/OXY7O/example-app-laravel` untuk referensi baru;
- URL repository lama tetap diarahkan GitHub, tetapi tidak digunakan lagi dalam
  dokumen aktif;
- pin reusable workflow tetap pada commit immutable yang sama sehingga perilaku
  CI dan artifact tidak berubah.

### Batas perubahan

- tidak ada perubahan aplikasi, endpoint, dependency lock, compatibility lane,
  artifact contract, atau deployment behavior;
- repository tetap berstatus contoh implementasi pilot, bukan production starter
  atau klaim operational compliance.

## [0.2.1] - 2026-08-29

### Dokumentasi

- Menyusun ulang README sebagai panduan implementasi: tujuan demo, hubungan antar-repository, quick start, matriks versi, artifact, dan langkah adopsi.
- Menambahkan badge untuk Versi release, Status CI, Profil PHP/Laravel, Demo referensi, dan batas Tanpa deployment.
- Mengganti README generik bawaan Laravel 12 dengan panduan khusus compatibility lane.

### Dampak bagi pengguna

- Developer dapat menemukan file yang perlu dipelajari dan langkah menjalankan canonical maupun compatibility lane dari satu halaman.
- Project lead dapat membedakan active, security-only, preview, dan legacy/EOL beserta perilakunya.
- Tidak ada perubahan perilaku CI, dependency lock, compatibility matrix, artifact, endpoint, atau batas keamanan dari `v0.2.0`.

### Cara mengadopsi

- Gunakan README `v0.2.1` sebagai panduan terbaru.
- Consumer tidak perlu mengganti pin `platform-workflow` karena release ini hanya menyempurnakan dokumentasi demo.

## [0.2.0] - 2026-08-29

### Added

- Laravel 12 multi-lock lane dengan platform PHP 8.2 dan endpoint contract yang sama.
- Enam compatibility-only lane wajib serta canonical artifact lane yang tetap tunggal.
- Panduan aktivasi preview dan exception legacy.

### Security

- Compatibility matrix tetap read-only, secretless, artifactless, dan tanpa deployment.

## [0.1.0] - 2026-08-29

### Changed

- Memperbarui caller ke `platform-workflow v0.1.2` untuk dukungan consumer private repository dan source artifact filtering.

### Added

- Laravel API minimal untuk health dan deterministic example resource.
- Compatibility catalogue PHP/Laravel dengan lifecycle dan execution mode terpisah.
- Thin caller immutable untuk reusable workflow `php-laravel`.
- Self-validation, coverage gate 80%, traceability, dan template evidence pilot.
- Hasil pilot aktual berstatus `passed` dengan artifact dan manifest digest terverifikasi.

### Security

- Permission workflow read-only, tanpa application secret dan tanpa deployment.
