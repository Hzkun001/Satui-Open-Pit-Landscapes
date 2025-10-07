# Satui Open-Pit Landscapes - RadarGeo.study

> Versi lokal dari prototype "Website Storytelling Design" — front-end React (Vite) dibangun dari komponen UI shadcn dan radix UI.

Ringkasan: proyek ini menampilkan storytelling interaktif berbasis peta/satelit (SAR & optical) dan visualisasi perubahan lahan. Aset gambar besar disimpan di `src/assets` dan dipetakan lewat alias di `vite.config.ts`.

## Isi penting repo

- `index.html` — entry HTML
- `package.json` — dependensi & skrip
- `vite.config.ts` — konfigurasi Vite, alias asset dari Figma
- `src/` — kode sumber React, komponen, aset, dan dokumen pendukung
  - `src/App.tsx` — komponen utama aplikasi
  - `src/main.tsx` — entry React
  - `src/assets/` — gambar yang diekspor dari Figma
  - `src/Attributions.md` — informasi lisensi/atribusi aset
  - `src/guidelines/Guidelines.md` — pedoman internal (template)

## Persyaratan

- Node.js (rekomendasi: LTS — mis. 19/20)
- npm (atau yarn/pnpm sebagai alternatif)

Periksa versi pada Windows PowerShell:

```powershell
node -v
npm -v
```

## Instalasi & Menjalankan (development)

1. Instal dependensi:

```powershell
npm install
```

2. Jalankan server development (Vite):

```powershell
npm run dev
```

Default server: http://localhost:3000

### Build produksi

```powershell
npm run build
```

Output build akan berada di folder `build` (sesuai `vite.config.ts`).

## Skrip penting (dari `package.json`)

- `dev` — jalankan Vite untuk development
- `build` — build untuk produksi

## Catatan teknis

- Framework: React 18 + Vite. Plugin utama: `@vitejs/plugin-react-swc`.
- Banyak aset diimport memakai alias `figma:asset/...` (alias didefinisikan di `vite.config.ts`). Jika terjadi error saat bundling, periksa apakah file yang dirujuk benar-benar ada di `src/assets`.
- Beberapa dependensi di `package.json` menggunakan wildcard ("*") atau versi yang tidak umum — untuk stabilitas, disarankan mengunci versi eksplisit.

Potensi perbaikan:

1. Ganti wildcard ("*") ke versi konkret agar reproducible installs.
2. Tambahkan skrip linting dan typecheck (mis. `npm run lint`, `npm run typecheck`) saat proyek tumbuh.
3. Tambahkan `CONTRIBUTING.md` dan `CODE_OF_CONDUCT.md` jika repo akan dikembangkan bersama orang lain.

## Dokumen & Atribusi

- Atribusi asset ada di `src/Attributions.md`.
- Pedoman internal (template) ada di `src/guidelines/Guidelines.md`.

Pastikan memeriksa file tersebut ketika menambahkan aset atau komponen pihak ketiga.

## Cara berkontribusi singkat

1. Fork atau clone repo
2. Buat branch fitur
3. Ikuti pedoman di `src/guidelines/Guidelines.md`
4. Buat PR dengan deskripsi jelas dan screenshot bila perlu

Untuk perubahan besar pada dependensi: sertakan catatan kompatibilitas dan cek build berjalan (`npm run build`).

---
