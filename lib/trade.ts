import { ethers } from 'ethers';

// ABI for TradeRouter.executeTrade(uint256,bool,uint256)
const TRADE_ROUTER_ABI = [
  'function executeTrade(uint256 marketId, bool buyYes, uint256 minOutcomeAmount) payable'
];

const iface = new ethers.utils.Interface(TRADE_ROUTER_ABI);

export function encodeExecuteTrade(marketId: string | number, buyYes: boolean, minOutcomeAmount: string | number, valueWei?: string) {
  // marketId may be numeric or string — ensure BigNumber encoding
  const data = iface.encodeFunctionData('executeTrade', [ethers.BigNumber.from(marketId), buyYes, ethers.BigNumber.from(minOutcomeAmount)]);
  return {
    to: process.env.TRADE_ROUTER_ADDRESS || null,
    data,
    value: valueWei || '0',
  };
}

export function getInterfaceAbi() {
  return TRADE_ROUTER_ABI;
}
