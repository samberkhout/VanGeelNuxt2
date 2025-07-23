import React from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QRScanner({ onScan, scanned }) {
  return (
    <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : onScan}
      style={{ flex: 1 }}
    />
  );
}
