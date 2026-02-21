require('@nomiclabs/hardhat-ethers');
require('dotenv').config();

module.exports = {
  solidity: {
    compilers: [{ version: '0.8.19' }]
  },
  networks: {
    polygon: {
      url: process.env.POLYGON_RPC || '',
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  }
};
