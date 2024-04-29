import { ethers } from "ethers";
import Erc20Contract from "../contracts/Erc20";
import AsyncStorage from "@react-native-async-storage/async-storage";

const polygonProviderInstance = new ethers.JsonRpcProvider(
  // "https://mainnet.infura.io/v3/c5a9eaae75b04ad78aeb479a275fa884"
  // "https://sepolia.infura.io/v3/c5a9eaae75b04ad78aeb479a275fa884"
  // "https://sepolia.infura.io/v3/60a31a9e69a940f98d0935f01c122d4e"
  "https://polygon-mainnet.infura.io/v3/c5a9eaae75b04ad78aeb479a275fa884"
);

const etherumProviderInstance = new ethers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/c5a9eaae75b04ad78aeb479a275fa884"
);

const SUPPORTED_CHAINS = Object.freeze({
  ETHEREUM: "Ethereum",
  POLYGON: "Polygon",
});
export const provider = (chain) => {
  const selectedChain = SUPPORTED_CHAINS.POLYGON;
  return chain === SUPPORTED_CHAINS.ETHEREUM
    ? etherumProviderInstance
    : polygonProviderInstance;
};
export const fetchDynamicDetailsOfToken = async (tokenAddress, walletAdd) => {
  const erc20Prov = new Erc20Contract(tokenAddress, provider());
  try {
    // const balance = await erc20Prov.balanceOf(
    //   "0x5Ec3A0c889CD52Fc0b482ED5F927c5a9b13EB141"
    // );
    const balance = await erc20Prov.balanceOf(walletAdd);
    // const balance = await erc20Prov.balanceOf(walletAdd);
    const bal = ethers.formatUnits(balance, 6);
    return bal;
  } catch (e) {}
};
export const tokenDetail = async (tokenAddress, chain) => {
  console.log("check tokkennn::::", tokenAddress);
  const erc20Prov = new Erc20Contract(tokenAddress, provider(chain));

  try {
    const balance = await erc20Prov.balanceOf(tokenAddress);
    console.log("test balance:::", balance);
    const symbol = await erc20Prov.symbol();
    const tokenName = await erc20Prov.name();
    const decimals = await erc20Prov.decimals();
    return {
      success: { balance, symbol, tokenName, decimals },
    };
  } catch (error) {
    console.error("Error fetching token details:", error);
    return error;
  }
};

export let wallet;

export const createNewWallet = () => {
  wallet = ethers.Wallet.createRandom(provider);
  const mnemonic = wallet.mnemonic.phrase;
  // return { wallet, mnemonic, encryptedWallet: wallet.encryptSync("123") };
  return { wallet, mnemonic };
};

// export const decryptWalletFromJson = (jsonWallet) => {
//   return ethers.Wallet.fromEncryptedJsonSync(jsonWallet, "123");
// };

export const erc20Instance = (tokenAddress) => {
  const erc20Prov = new Erc20Contract(tokenAddress, provider);
  return erc20Prov;
};
