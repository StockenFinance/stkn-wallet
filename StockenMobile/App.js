import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Welcome from './src/Welcome/Welcome';
import ImportWallet from './src/ImportWallet/ImportWallet';
import CreateWallet from './src/CreateWallet/CreateWallet';
import BackupPhrase from './src/BackupPhrase/BackupPhrase';
import ConfirmBackupPhrase from './src/ConfirmBackupPhrase/ConfirmBackupPhrase';
import RecoveryPhraseConfirmation from './src/RecoveryPhraseConfirmation/RecoveryPhraseConfirmation';
import Dashboard from './src/Dashboard/Dashboard';
import SwapScreen from './src/SwapScreen/SwapScreen';
import Settings from './src/Settings/Settings';
import SendScreen from './src/SendScreen/SendScreen';

const App = () => {
  return <SendScreen />;
};

export default App;

const styles = StyleSheet.create({});
