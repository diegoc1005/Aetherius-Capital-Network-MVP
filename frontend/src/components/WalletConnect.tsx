'use client';

import { useState, useCallback, useEffect } from 'react';
import { BrowserProvider, Eip1193Provider } from 'ethers';

const FUJI_CHAIN_ID = '0xa869'; // 43113 in hex

declare global {
  interface Window {
    avalanche?: Eip1193Provider;
    ethereum?: Eip1193Provider;
  }
}

interface WalletConnectProps {
  connectedAddress?: string | null;
  onAddressChange?: (address: string | null) => void;
}

export default function WalletConnect({ connectedAddress, onAddressChange }: WalletConnectProps = {}) {
  const [address, setAddress] = useState<string | null>(connectedAddress || null);
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Sync internal address state with connectedAddress prop
  useEffect(() => {
    if (connectedAddress !== undefined) {
      setAddress(connectedAddress);
    }
  }, [connectedAddress]);

  // Notify parent of address changes
  useEffect(() => {
    onAddressChange?.(address);
  }, [address, onAddressChange]);

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

  // Check if already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const isDisconnected = typeof window !== 'undefined' && localStorage.getItem('wallet_disconnected') === 'true';
        if (isDisconnected) return;

        const provider = getProvider();
        if (provider) {
          const accounts = await provider.send('eth_accounts', []);
          if (accounts && accounts.length > 0) {
            setAddress(accounts[0]);
          }
        }
      } catch (err) {
        console.error('Error checking connection on mount:', err);
      }
    };
    checkConnection();
  }, [getProvider]);

  // Listen to provider events (accountsChanged, chainChanged)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const provider = window.avalanche || window.ethereum;
    if (provider && provider.on) {
      const handleAccounts = (accounts: string[]) => {
        if (accounts.length > 0) {
          localStorage.setItem('wallet_disconnected', 'false');
          setAddress(accounts[0]);
        } else {
          localStorage.setItem('wallet_disconnected', 'true');
          setAddress(null);
        }
      };

      const handleChain = () => {
        window.location.reload();
      };

      provider.on('accountsChanged', handleAccounts as any);
      provider.on('chainChanged', handleChain as any);

      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccounts as any);
          provider.removeListener('chainChanged', handleChain as any);
        }
      };
    }
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

      localStorage.setItem('wallet_disconnected', 'false');
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
    localStorage.setItem('wallet_disconnected', 'true');
    setAddress(null);
  };

  const truncateAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className="flex items-center gap-2">
      {error && (
        <span className="text-[10px] text-[#EF4444] max-w-[150px] truncate" title={error}>
          {error}
        </span>
      )}

      {address ? (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-[#111113] border border-[#27272A] rounded-lg px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
            <code className="text-xs text-[#A1A1AA] font-mono">{truncateAddress(address)}</code>
          </div>
          <button
            onClick={disconnectWallet}
            className="p-1.5 rounded-md hover:bg-[#1F1F23] text-[#71717A] hover:text-[#EF4444] transition-colors cursor-pointer"
            title="Desconectar"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="flex items-center gap-2 bg-[#1E40AF] hover:bg-[#1D4ED8] disabled:bg-[#27272A] disabled:text-[#71717A] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          {isConnecting ? (
            <>
              <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Conectando...
            </>
          ) : (
            'Conectar Wallet'
          )}
        </button>
      )}
    </div>
  );
}
