"use client";

import { NetworkSwitcher } from "../components/network-switcher";
import { Profile } from "../connect/connect";

export const ConnectButton = () => {
  return (
    <div className="flex gap-1">
      <NetworkSwitcher />
      <Profile />
    </div>
  );
};
