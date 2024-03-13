import { StyleSheet, Text, View } from "react-native";
import React from "react";
// import Welcome from './src/Welcome/Welcome';
// import ImportWallet from './src/ImportWallet/ImportWallet';
// import CreateWallet from './src/CreateWallet/CreateWallet';
// import BackupPhrase from './src/BackupPhrase/BackupPhrase';
// import ConfirmBackupPhrase from './src/ConfirmBackupPhrase/ConfirmBackupPhrase';
// import RecoveryPhraseConfirmation from './src/RecoveryPhraseConfirmation/RecoveryPhraseConfirmation';
// import Dashboard from './src/Dashboard/Dashboard';
// import SwapScreen from './src/SwapScreen/SwapScreen';
// import Settings from './src/Settings/Settings';
// import SendScreen from './src/SendScreen/SendScreen';
// import BuyScreen from './src/BuyScreen/BuyScreen';
import ChartScreen from "./src/ChartScreen/ChartScreen";
import Activity from "./src/Activity/Activity";
import AppNavigator from "./src/AppNavigator";
import "@walletconnect/react-native-compat";
import { WagmiConfig } from "wagmi";
import { mainnet, polygon, arbitrum } from "viem/chains";
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
} from "@web3modal/wagmi-react-native";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "20eb0c483bb4801ec4004dea1a843576";

// 2. Create config
const metadata = {
  name: "Web3Modal RN",
  description: "Web3Modal RN Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
  redirect: {
    native: "YOUR_APP_SCHEME://",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};

const chains = [mainnet, polygon, arbitrum];

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});
const App = () => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <AppNavigator />
      <Web3Modal />
    </WagmiConfig>
  );
};

export default App;

const styles = StyleSheet.create({});
