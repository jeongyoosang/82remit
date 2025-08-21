// 82remit-template/lib/web3auth.ts
import { Web3Auth } from '@web3auth/modal';
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from '@web3auth/base';

export const web3AuthConfig = {
  clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || '',
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x1', // Ethereum mainnet
    rpcTarget: 'https://rpc.ankr.com/eth',
  },
  web3AuthNetwork: WEB3AUTH_NETWORK.TESTNET,
  // authMode: 'DAPP' as const, // 필요하면 이 줄 주석 해제
};

export const web3Auth = new Web3Auth(web3AuthConfig as any);

export const initWeb3Auth = async () => {
  await web3Auth.initModal();
  return web3Auth;
};
