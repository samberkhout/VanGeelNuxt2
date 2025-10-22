import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_barcode_scanner/flutter_barcode_scanner.dart';
import 'package:flutter_web_auth/flutter_web_auth.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Spotify QR Player',
      home: HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String? _accessToken;
  String _status = '';

  static const String clientId = 'YOUR_CLIENT_ID';
  static const String redirectUri = 'yourapp://callback';
  static const String scopes = 'user-read-playback-state user-modify-playback-state streaming';

  Future<void> _authenticate() async {
    final url = Uri.https('accounts.spotify.com', '/authorize', {
      'client_id': clientId,
      'response_type': 'token',
      'redirect_uri': redirectUri,
      'scope': scopes,
    });
    final result = await FlutterWebAuth.authenticate(url: url.toString(), callbackUrlScheme: 'yourapp');
    final fragment = Uri.parse(result).fragment;
    final token = Uri.splitQueryString(fragment)['access_token'];
    setState(() => _accessToken = token);
  }

  Future<void> _scanAndPlay() async {
    if (_accessToken == null) {
      await _authenticate();
      if (_accessToken == null) return;
    }
    final qr = await FlutterBarcodeScanner.scanBarcode('#ff6666', 'Cancel', true, ScanMode.QR);
    if (!qr.startsWith('https://open.spotify.com/track/')) {
      setState(() => _status = 'Geen geldige Spotify tracklink');
      return;
    }
    final trackId = Uri.parse(qr).pathSegments.last;
    final ok = await _playTrack(trackId);
    setState(() => _status = ok ? '🎧 Track speelt af…' : 'Open Spotify op actief apparaat');
  }

  Future<bool> _playTrack(String trackId) async {
    final res = await http.put(
      Uri.parse('https://api.spotify.com/v1/me/player/play'),
      headers: {
        'Authorization': 'Bearer $_accessToken',
        'Content-Type': 'application/json',
      },
      body: jsonEncode({'uris': ['spotify:track:$trackId']}),
    );
    return res.statusCode == 204;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Spotify QR Player')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: _scanAndPlay,
              child: const Text('Scan QR'),
            ),
            const SizedBox(height: 20),
            Text(_status),
          ],
        ),
      ),
    );
  }
}
