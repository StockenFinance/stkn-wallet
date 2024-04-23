import { SET_CURRENT_CHAIN } from "./types";

export const setCurrentChain = (currenChain) => {
  console.log("currenntChain from actions", currenChain);
  return {
    type: SET_CURRENT_CHAIN,
    payload: currenChain,
  };
};
