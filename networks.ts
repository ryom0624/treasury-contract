import { NetworksUserConfig } from 'hardhat/types';
import dotenv from 'dotenv';

dotenv.config();

const networks: NetworksUserConfig = {};

// networks.rinkeby = {
//   chainId: 4,
//   url: process.env.ALCHEMY_RINKEBY_RPC_URL,
//   accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
// };
// networks.goerli = {
//   chainId: 5,
//   url: process.env.ALCHEMY_GOERLI_RPC_URL,
//   accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
// };
networks.shibuya = {
  chainId: 81,
  url: 'https://shibuya.public.blastapi.io',
  accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
  timeout: 60 * 1000,
};
networks.astar = {
  chainId: 592,
  url: 'https://astar.public.blastapi.io',
  accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
  timeout: 60 * 1000,
};
networks.hardhat = {
  chainId: 31337,
  // forking: {
  //   url: process.env.ALCHEMY_MAINNET_RPC_URL ? process.env.ALCHEMY_MAINNET_RPC_URL : "",
  //   blockNumber: 15460000,
  // },
};

export default networks;
