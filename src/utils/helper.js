import { ethers } from "ethers";
import Erc20Contract from "../contracts/Erc20";

const providerInstance = new ethers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/c5a9eaae75b04ad78aeb479a275fa884"
  // "https://sepolia.infura.io/v3/60a31a9e69a940f98d0935f01c122d4e"
);
export const provider = providerInstance;
export const fetchDynamicDetailsOfToken = async (tokenAddress) => {
  const erc20Prov = new Erc20Contract(tokenAddress, provider);
  try {
    const balance = await erc20Prov.balanceOf(
      "0x28C6c06298d514Db089934071355E5743bf21d60"
    );
    console.log("Token balance: ", balance);
  } catch (e) {}
};
export const tokenDetail = async (
  tokenAddress = "0x28C6c06298d514Db089934071355E5743bf21d60"
) => {
  console.log("tokenAddress", tokenAddress);
  console.log("works");

  const erc20Prov = new Erc20Contract(tokenAddress, provider);
  try {
    const balance = await erc20Prov.balanceOf(
      "0x28C6c06298d514Db089934071355E5743bf21d60"
    );
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
  return { wallet, mnemonic };
};

export const erc20Instance = (tokenAddress) => {
  const erc20Prov = new Erc20Contract(tokenAddress, provider);
  return erc20Prov;
};
