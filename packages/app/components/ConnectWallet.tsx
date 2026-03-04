"use client";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import { ActionCodesWalletName } from "@actioncodes/wallet-adapter";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false },
);

export function ConnectWallet() {
  const { wallets, select, connect, connected, connecting } = useWallet();

  const acWallet = wallets.find((w) => w.adapter.name === ActionCodesWalletName);
  const acIcon = acWallet?.adapter.icon;

  const handleActionCodeConnect = async () => {
    select(ActionCodesWalletName);
    // select is sync but updates state async — defer connect one tick
    setTimeout(() => connect().catch(() => {}), 0);
  };

  return (
    <div className="flex flex-col items-center gap-3 max-w-md mx-auto mt-4">
      <WalletMultiButtonDynamic className="!bg-purple-600 hover:!bg-purple-700 !text-white !font-bold !py-2 !px-4 !rounded !transition-colors !w-full !justify-center" />

      {!connected && (
        <>
          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/30">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <button
            onClick={handleActionCodeConnect}
            disabled={connecting}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-accent/30 text-accent text-sm font-medium hover:bg-accent/10 transition-colors disabled:opacity-50"
          >
            {acIcon ? (
              <img src={acIcon} alt="Action Codes" width={16} height={16} className="rounded-sm" />
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
            )}
            {connecting ? "Connecting…" : "Sign with Action Code"}
          </button>
        </>
      )}
    </div>
  );
}
