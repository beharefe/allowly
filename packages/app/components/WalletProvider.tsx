"use client";

import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { ActionCodesWalletAdapter } from "@actioncodes/wallet-adapter";
import config from "@/constants";

export function SolanaWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const endpoint = config.rpcUrl;

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new ActionCodesWalletAdapter({
        authToken: process.env.NEXT_PUBLIC_ACTIONCODES_AUTH_TOKEN || "",
        connection: endpoint,
        environment: "mainnet",
      }),
      new SolflareWalletAdapter(),
    ],
    [endpoint],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
