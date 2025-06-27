# AGENTS.md – QR-to-Mystery-Spotify App

## 🎯 Doel
Een mobiele app die een QR-code scant, en het bijbehorende Spotify-nummer automatisch afspeelt zonder titel, artiest of cover te tonen.

---

## 🔐 AuthAgent

**Doel:** Log de gebruiker in met zijn Spotify-account om muziek af te kunnen spelen.

### Taken:
- Start OAuth2 login (met `streaming`, `user-read-playback-state`, `user-modify-playback-state`)
- Bewaar toegangstokens
- Geef tokens door aan PlayTrackAgent

---

## 📷 QRScanAgent

**Doel:** Scan QR-code, en haal de verborgen Spotify-track-link op.

### Taken:
- Open camera en scan QR-code
- Controleer of de link begint met `https://open.spotify.com/track/`
- Extracteer `trackId` uit URL
- Stuur `trackId` naar PlayTrackAgent

---

## 🔊 PlayTrackAgent

**Doel:** Speel de track automatisch af via Spotify, **zonder** metadata te tonen.

### Taken:
- Start Spotify-connectie via Web Playback SDK of Spotify Connect
- Speel track af op actief apparaat
- **Geen metadata ophalen of tonen**
- Toon enkel generiek scherm zoals "🎵 Jouw verrassing speelt nu..."

---

## 🎨 UIAgent

**Doel:** Eenvoudige, cleane interface zonder informatie over het nummer.

### Schermen:
- Home: "Scan QR om te starten"
- Camera-scherm
- Laadscherm: "Track wordt geladen..."
- Afspelen-scherm: "🎧 Luister zonder te kijken"
- Eventueel een "stop" of "volgende QR" knop

---

## 🛠️ Stack
Onderdeel	Technologie (.NET)
Framework	.NET MAUI (Multi-platform App UI)
QR scanner	ZXing.Net.MAUI (open source QR/barcode scanning in MAUI)
Spotify integratie	Spotify Web API via HttpClient + Spotify SDK (voor Connect-auth)
Beveiliging	Geen lokale opslag van tekst of metadata; gebruik veilige API-calls
Streaming	Alleen via Spotify Connect (Spotify-app op apparaat vereist)

---

## 🔄 Flow

1. Gebruiker opent app
2. Klikt op "Scan QR"
3. QR-code bevat Spotify-tracklink → wordt gelezen
4. Track wordt direct afgespeeld via Spotify
5. App toont géén naam, cover of artiest

---

## ❗ Belangrijk

Spotify **verplicht** dat je afspeelt via een "active device". Dat betekent:
- Gebruiker moet Spotify open hebben op telefoon of desktop
- Je kunt **niet direct afspelen in je app**, tenzij je Web Playback SDK gebruikt (alleen op web)

Alternatief:
- App detecteert actief Spotify-apparaat
- Stuurt API-call om track daar te starten (`/me/player/play`)

---
