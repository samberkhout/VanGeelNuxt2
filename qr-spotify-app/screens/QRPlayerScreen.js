import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Linking } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import QRScanner from '../components/QRScanner';

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
      <QRScanner onScan={handleBarCodeScanned} scanned={scanned} />
      {scanned && (
        <Text style={styles.info}>Nummer wordt afgespeeld in Spotify...</Text>
      )}
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
