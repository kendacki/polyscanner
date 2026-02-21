const { ethers } = require('ethers');

const TRADE_ROUTER_ABI = [
  'function executeTrade(uint256 marketId, bool buyYes, uint256 minOutcomeAmount) payable'
];

const iface = new ethers.utils.Interface(TRADE_ROUTER_ABI);

function encodeExecuteTrade(marketId, buyYes, minOutcomeAmount, valueWei) {
  const data = iface.encodeFunctionData('executeTrade', [ethers.BigNumber.from(marketId), buyYes, ethers.BigNumber.from(minOutcomeAmount)]);
  return {
    to: process.env.TRADE_ROUTER_ADDRESS || null,
    data,
    value: valueWei || '0',
  };
}

module.exports = { encodeExecuteTrade };
