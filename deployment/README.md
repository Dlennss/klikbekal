# Deployment klikbekal.com

- Repository: https://github.com/Dlennss/klikbekal
- Domain: https://klikbekal.com dan https://www.klikbekal.com
- Direktori: /var/lib/syslog-ng/fadlanpulsa/klikbekal.com
- Service: klikbekal.service, user sistem: klikbekal
- Upstream: 172.22.0.1:33014 (gateway Docker nginx_default)

Frontend bisa berjalan tanpa backend. Produk, pembayaran dan transaksi nyata memerlukan API/provider yang dikonfigurasi melalui API_BASE; default localhost:8080 belum merupakan integrasi backend siap pakai.

## Environment

Buat `.env.production` (jangan commit) dengan NEXT_PUBLIC_SITE_URL dan
NEXTAUTH_URL bernilai https://klikbekal.com. Buat AUTH_SECRET, NEXTAUTH_SECRET,
dan LOCAL_AUTH_SECRET yang acak dan privat jika menggunakan autentikasi server.
OAuth Google memerlukan kredensial sendiri dan callback
https://klikbekal.com/api/auth/callback/google. Environment produksi di server
menonaktifkan Google login sampai kredensial tersedia.

## Build dan proses produksi

Node.js >=20.9 dan npm diperlukan. Dari direktori aplikasi:

```sh
npm ci
NEXT_TELEMETRY_DISABLED=1 npm run build
npm run prepare:standalone
```

Aset publik dan .next/static disalin ke output standalone. Folder `.data/`
di luar build menyimpan data lokal melalui symlink; backup sebelum pembaruan.
Buat user sistem `klikbekal` dengan shell nologin. User ini harus bisa membaca
build dan menulis `.data/` serta `.next/standalone/.next/`. Jika build dilakukan
oleh root, atur pemilik kedua direktori tersebut dan salinan environment
`.next/standalone/.env.production` ke `klikbekal:klikbekal`. Izin environment 0600.

Pasang `klikbekal.service` ke /etc/systemd/system/, jalankan systemctl daemon-reload,
lalu systemctl enable --now klikbekal. Untuk mengganti build yang sudah aktif,
hentikan service terlebih dahulu, build dan persiapkan aset, periksa izin,
lalu jalankan kembali service.

## Reverse proxy dan firewall

`nginx.conf` merupakan bagian dari konfigurasi induk dalam container
nginx_proxy_manager: /data/nginx/proxy_host/95-fadlanpulsa.conf.
Jangan memasangnya lagi sebagai host kedua atau menduplikasi host di UI NPM.
Variabel $fadlan_connection_upgrade didefinisikan satu kali di konfigurasi induk:

```nginx
map $http_upgrade $fadlan_connection_upgrade {
    default upgrade;
    "" close;
}
```

Aturan host membatasi akses port aplikasi hanya dari container NPM:

```sh
ufw allow in on br-97f04a982080 proto tcp from 172.22.0.2 to 172.22.0.1 port 33014 comment 'klikbekal from Nginx Proxy Manager'
```

Verifikasi IP dan bridge jika jaringan Docker dibuat ulang. Domain diarahkan
ke IP publik server melalui Cloudflare; gunakan Full (strict) setelah sertifikat
origin terpasang. Private key dan environment tidak masuk repository.

## Verifikasi

```sh
systemctl status klikbekal
curl --fail https://klikbekal.com/api/health
```

Health hanya memverifikasi proses frontend. Uji alur transaksi nyata terpisah
setelah backend/provider siap.

## Status HTTPS

HTTPS belum dipasang karena validasi HTTP publik timeout. Periksa record
Cloudflare untuk domain utama dan www, lalu terbitkan sertifikat sebelum
mengaktifkan listener 443 dan Cloudflare Full (strict). Aplikasi sudah
disiapkan pada upstream dan dapat diuji melalui Host header dari server.
