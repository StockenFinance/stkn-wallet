import { ethers } from 'ethers';
import config from '../../config';
import Escrow9MMabi from '../abi/Escrow9MM.json';

class Escrow9MMContract {
  constructor(signerOrProvider, chainId) {
    this.contract = new ethers.Contract(
      config.contracts[chainId].escrow9mm.address,
      Escrow9MMabi,
      signerOrProvider
    );
  }

  createOffer(
    baseToken,
    baseAmount,
    quoteToken,
    quoteAmount,
    fillType,
    tradeType
  ) {
    return this.contract.createOffer(
      baseToken,
      baseAmount,
      quoteToken,
      quoteAmount,
      fillType,
      tradeType
    );
  }

  fillOffer(id, fillAmount) {
    return this.contract.fillOffer(id, fillAmount);
  }

  closeOffer(id) {
    return this.contract.closeOffer(id);
  }

  getAllOffers() {
    return this.contract.getAllOffers();
  }

  getOfferByAddress(address) {
    return this.contract.getOfferByAddress(address);
  }

  getOfferById(id) {
    return this.contract.getOfferById(id);
  }
}

export default Escrow9MMContract;
