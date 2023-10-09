"use client";

import { Button } from "@/components/shared/button";
import React from "react";
import { useNetwork, useSwitchNetwork } from "wagmi";

export function NetworkSwitcher() {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          type="button"
          onClick={() => {
            setIsDropdownOpen((x) => !x);
          }}
        >
          Network: {chain?.name}
        </Button>

        <div
          id="dropdown"
          className={`z-10 absolute  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${
            !isDropdownOpen && "hidden"
          }`}
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            {chains.map((x) => (
              <li key={x.id} onClick={() => switchNetwork?.(x.id)}>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  {x.name}
                  {isLoading && pendingChainId === x.id && " (switching)"}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
