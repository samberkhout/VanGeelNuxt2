
# AGENTS.md – QR → Spotify Player App (Zonder info tonen)

## 🎯 Doel

Een eenvoudige mobiele app waarin je alleen een QR-code scant. De QR bevat een Spotify-link of URI, en de app opent automatisch dat nummer in de Spotify-app. Je ziet niet wie de artiest is of welk nummer het is.

---

## ⚙️ Stack

- **Frontend**: React Native + Expo
- **Modules**:
    - `expo-barcode-scanner` – voor QR-scanning
    - `expo-linking` – om Spotify-link te openen
    - Geen backend of database nodig

---

## 📁 Structuur

```
qr-spotify-app/
├── App.js
├── screens/
│   └── QRPlayerScreen.js
├── components/
│   └── QRScanner.js
└── README.md
```

---

## 🚀 Setup

```bash
npx create-expo-app qr-spotify-app
cd qr-spotify-app
npm install expo-barcode-scanner
```

---

## 📲 Functieoverzicht

- Scan QR-code met `spotify:track:...` of `https://open.spotify.com/track/...`
- Opent direct Spotify om af te spelen
- Geen verdere informatie zichtbaar
- App keert automatisch terug naar scan-modus voor volgende QR

---

## 📄 App.js

```js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QRPlayerScreen from './screens/QRPlayerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="QRPlayer" component={QRPlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

---

## 📷 QRPlayerScreen.js

```js
import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, Linking } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QRPlayerScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    if (data.startsWith('spotify:') || data.includes('open.spotify.com')) {
      Linking.openURL(data.includes('http') ? data : `https://open.spotify.com/track/${data.split(':')[2]}`);
    }
    setTimeout(() => setScanned(false), 2000); // opnieuw klaar om te scannen
  };

  if (hasPermission === null) return <Text>Toestemming vragen...</Text>;
  if (hasPermission === false) return <Text>Geen toegang tot camera</Text>;

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ flex: 1 }}
      />
      {scanned && <Text style={styles.info}>Nummer wordt afgespeeld in Spotify...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  info: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: 'black',
    color: 'white',
    padding: 10,
    borderRadius: 10,
  },
});
```

---

## ✅ MVP Checklist

- [x] QR-code scannen
- [x] Spotify-link herkennen
- [x] Afspelen in Spotify
- [x] Geen info tonen
- [x] Klaar voor volgende QR

---

## 🧪 Testen

Scan QR-code met `spotify:track:...` of `https://open.spotify.com/track/ID`. App opent Spotify direct, speelt nummer af. Gebruik testcodes op papier of vanaf scherm.

