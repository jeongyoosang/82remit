import { Web3Auth } from '@web3auth/modal';
import { CHAIN_NAMESPACES, type Web3AuthOptions } from '@web3auth/base';

export const web3AuthConfig: Web3AuthOptions = {
  clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || '',
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x1',
    rpcTarget: 'https://rpc.ankr.com/eth',
  },
  web3AuthNetwork: 'testnet' as any, // 타입 충돌 시 캐스팅
  authMode: 'DAPP',
};

export const web3Auth = new Web3Auth(web3AuthConfig);

export const initWeb3Auth = async () => {
  await web3Auth.initModal();
  return web3Auth;
};
