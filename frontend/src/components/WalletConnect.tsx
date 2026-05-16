'use client';

import { useState, useCallback } from 'react';
import { BrowserProvider, Eip1193Provider } from 'ethers';

const FUJI_CHAIN_ID = '0xa869'; // 43113 in hex

declare global {
  interface Window {
    avalanche?: Eip1193Provider;
    ethereum?: Eip1193Provider;
  }
}

export default function WalletConnect() {
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const getProvider = useCallback(() => {
    if (typeof window === 'undefined') return null;

    // Prioritize Core Wallet (window.avalanche)
    if (window.avalanche) {
      return new BrowserProvider(window.avalanche);
    }

    // Fallback to other injected providers (like MetaMask)
    if (window.ethereum) {
      return new BrowserProvider(window.ethereum);
    }

    return null;
  }, []);

  const switchToFuji = async (provider: BrowserProvider) => {
    try {
      await provider.send('wallet_switchEthereumChain', [{ chainId: FUJI_CHAIN_ID }]);
    } catch (switchError: unknown) {
      // This error code indicates that the chain has not been added to MetaMask/Core.
      if (typeof switchError === 'object' && switchError !== null && 'code' in switchError && (switchError as { code: number }).code === 4902) {
        try {
          await provider.send('wallet_addEthereumChain', [
            {
              chainId: FUJI_CHAIN_ID,
              chainName: 'Avalanche Fuji Testnet',
              nativeCurrency: {
                name: 'Avalanche',
                symbol: 'AVAX',
                decimals: 18,
              },
              rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
              blockExplorerUrls: ['https://testnet.snowtrace.io/'],
            },
          ]);
        } catch {
          throw new Error('Failed to add Avalanche Fuji Testnet to your wallet.');
        }
      } else {
        throw new Error('Failed to switch to Avalanche Fuji Testnet.');
      }
    }
  };

  const connectWallet = async () => {
    setError(null);
    setIsConnecting(true);

    try {
      const provider = getProvider();

      if (!provider) {
        throw new Error('No Ethereum wallet found. Please install Core Wallet or MetaMask.');
      }

      // Request account access
      await provider.send('eth_requestAccounts', []);

      // Get the signer
      const signer = await provider.getSigner();
      const connectedAddress = await signer.getAddress();

      // Check and switch network if necessary
      const network = await provider.getNetwork();
      if (network.chainId !== BigInt(43113)) {
         await switchToFuji(provider);
      }

      setAddress(connectedAddress);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred while connecting the wallet.');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Wallet Connection</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md max-w-md text-center">
          {error}
        </div>
      )}

      {address ? (
        <div className="flex flex-col items-center">
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Connected Address:</p>
          <code className="mb-4 p-2 bg-gray-100 dark:bg-gray-900 rounded text-sm break-all text-gray-800 dark:text-gray-200">
            {address}
          </code>
          <p className="mb-4 text-sm font-semibold text-green-600 dark:text-green-400">
            Connected to Avalanche Fuji Testnet
          </p>
          <button
            onClick={disconnectWallet}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-md transition-colors flex items-center"
        >
          {isConnecting ? (
             <span className="flex items-center">
               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               Connecting...
             </span>
          ) : (
            'Connect Wallet'
          )}
        </button>
      )}

      <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center">
        <p>Prioritizes Core Wallet (window.avalanche)</p>
        <p>Requires Avalanche Fuji Testnet</p>
      </div>
    </div>
  );
}
