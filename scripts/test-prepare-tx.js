const { encodeExecuteTrade } = require('../lib/trade.cjs');
const ethers = require('ethers');

async function main() {
  // Example usage
  const example = encodeExecuteTrade(12345, true, '1000000000000000000', '0');
  console.log('Prepared tx object:');
  console.log(JSON.stringify(example, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
