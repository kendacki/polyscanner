require('dotenv').config();
const fs = require('fs');
const hre = require('hardhat');

async function main() {
  const MarketRouter = process.env.MARKET_ROUTER_ADDRESS || '0x0000000000000000000000000000000000000000';
  const TradeRouter = await hre.ethers.getContractFactory('TradeRouter');
  const router = await TradeRouter.deploy(MarketRouter);
  await router.deployed();
  console.log('TradeRouter deployed to:', router.address);
  // Save address
  fs.writeFileSync('data/deploy_trade_router.json', JSON.stringify({ address: router.address }, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
