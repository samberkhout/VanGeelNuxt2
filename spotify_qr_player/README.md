# Spotify QR Player

Minimal Flutter app that scans a QR code containing a Spotify track URL and plays it on the user's active device using the Spotify Web API.

## Usage
1. Replace `YOUR_CLIENT_ID` and `redirectUri` in `lib/main.dart` with your Spotify app credentials.
2. Run `flutter pub get`.
3. Launch the app on a device with Spotify installed and logged in.
4. Press **Scan QR** and scan a code like `https://open.spotify.com/track/<id>`.
5. The track starts playing on your active Spotify device.

No track metadata is shown, only a status message.
