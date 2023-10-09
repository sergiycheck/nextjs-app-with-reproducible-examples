"use client";

import dynamic from "next/dynamic";

const NetworkSwitcher = dynamic(() => import("../components/network-switcher"), { ssr: false });

const Profile = dynamic(() => import("../connect/connect"), { ssr: false });

export const ConnectButton = () => {
  return (
    <div className="flex gap-1">
      <NetworkSwitcher />
      <Profile />
    </div>
  );
};
