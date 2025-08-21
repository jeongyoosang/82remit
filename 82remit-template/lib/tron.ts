import TronWeb from 'tronweb';

// TRON Mainnet configuration
export const tronConfig = {
  fullHost: 'https://api.trongrid.io',
  headers: { 'TRON-PRO-API-KEY': process.env.NEXT_PUBLIC_TRON_API_KEY || '' }
};

export const tronWeb = new TronWeb(tronConfig);

// USDT contract address on TRON mainnet
export const USDT_CONTRACT_ADDRESS = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';

// Initialize TRON Web
export const initTronWeb = () => {
  if (typeof window !== 'undefined' && window.tronWeb) {
    return window.tronWeb;
  }
  return tronWeb;
};

// Get USDT balance
export const getUSDTBalance = async (address: string) => {
  try {
    const contract = await tronWeb.contract().at(USDT_CONTRACT_ADDRESS);
    const balance = await contract.balanceOf(address).call();
    return tronWeb.fromSun(balance);
  } catch (error) {
    console.error('Error getting USDT balance:', error);
    return '0';
  }
};

// Send USDT
export const sendUSDT = async (toAddress: string, amount: string, privateKey: string) => {
  try {
    const contract = await tronWeb.contract().at(USDT_CONTRACT_ADDRESS);
    const tx = await contract.transfer(toAddress, tronWeb.toSun(amount)).send();
    return tx;
  } catch (error) {
    console.error('Error sending USDT:', error);
    throw error;
  }
};