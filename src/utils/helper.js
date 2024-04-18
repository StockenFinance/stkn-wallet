import { ethers } from "ethers";
import Erc20Contract from "../contracts/Erc20";

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
export const provider = () => {
  const selectedChain = SUPPORTED_CHAINS.POLYGON;
  return selectedChain === SUPPORTED_CHAINS.ETHEREUM
    ? etherumProviderInstance
    : polygonProviderInstance;
};
export const fetchDynamicDetailsOfToken = async (tokenAddress) => {
  const erc20Prov = new Erc20Contract(tokenAddress, provider());
  try {
    const balance = await erc20Prov.balanceOf(
      "0x5Ec3A0c889CD52Fc0b482ED5F927c5a9b13EB141"
    );
    console.log("Token balance: ", balance);
    const bal = ethers.formatUnits(balance, 6);

    return bal;
  } catch (e) {}
};
export const tokenDetail = async (tokenAddress) => {
  console.log("tokenAddress", tokenAddress);
  console.log("works");

  const erc20Prov = new Erc20Contract(tokenAddress, provider());
  console.log(erc20Prov);
  try {
    const balance = await erc20Prov.balanceOf(tokenAddress);
    console.log("In token details...", balance);
    const symbol = await erc20Prov.symbol();
    const tokenName = await erc20Prov.name();
    const decimals = await erc20Prov.decimals();
    console.log("Balance:", balance);
    console.log("Symbol:", symbol);
    console.log("Name:", tokenName);
    console.log("Decimals:", decimals);
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
  console.log("generation of wallet:::", wallet);
  return { wallet, mnemonic, encryptedWallet: wallet.encryptSync("123") };
};

export const decryptWalletFromJson = (jsonWallet) => {
  return ethers.Wallet.fromEncryptedJsonSync(jsonWallet, "123");
};

export const erc20Instance = (tokenAddress) => {
  const erc20Prov = new Erc20Contract(tokenAddress, provider);
  return erc20Prov;
};
