import { SAVE_WALLET_ADDRESS } from "../actions/types";

const initialState = {
  walletAddress: null,
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_WALLET_ADDRESS:
      return {
        ...state,
        walletAddress: action.payload,
      };
    default:
      return state;
  }
};

export default walletReducer;
