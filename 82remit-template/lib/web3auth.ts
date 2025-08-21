import { Web3Auth } from '@web3auth/modal';
import { CHAIN_NAMESPACES } from '@web3auth/base';

export const web3AuthConfig = {
  clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || '',
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x1', // Ethereum mainnet
    rpcTarget: 'https://rpc.ankr.com/eth',
  },
  web3AuthNetwork: 'testnet',
  authMode: 'DAPP',
};

export const web3Auth = new Web3Auth(web3AuthConfig);

export const initWeb3Auth = async () => {
  try {
    await web3Auth.initModal();
    return web3Auth;
  } catch (error) {
    console.error('Web3Auth initialization failed:', error);
    throw error;
  }
};
