import { SAVE_WALLET_ADDRESS } from "./types";

export const saveWalletAddress = (walletAddress) => {
  return {
    type: SAVE_WALLET_ADDRESS,
    payload: walletAddress,
  };
};
