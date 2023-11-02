"use client";
import { useNetwork } from "wagmi";

export function ComponentWithUseNetwork() {
  const { chain, chains } = useNetwork();
  console.log({ chain, chains });

  return (
    <>
      {chain && <div>Connected to {chain.name}</div>}
      {chains && <div>Available chains: {chains.map((chain) => chain.name)}</div>}
    </>
  );
}
