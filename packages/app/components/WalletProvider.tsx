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
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore – types will resolve once @anthropic-test/wallet-adapter-actioncodes is published to npm with dist/
import { ActionCodesWalletAdapter } from "@anthropic-test/wallet-adapter-actioncodes";
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
      new SolflareWalletAdapter(),
      new ActionCodesWalletAdapter({
        authToken: process.env.NEXT_PUBLIC_ACTION_CODES_TOKEN!,
        connection: config.rpcUrl,
        environment: "mainnet",
      }),
    ],
    [],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
