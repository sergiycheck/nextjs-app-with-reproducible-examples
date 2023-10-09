"use client";

import { Button } from "@/components/shared/button";
import { Dialog } from "@/components/shared/dialogs/Dialog";
import Image from "next/image";
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { MdRefresh } from "react-icons/md";
import React from "react";

export function Profile() {
  const { address, connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();
  const [showDialog, setShowDialog] = React.useState(false);

  if (isConnected) {
    return (
      <div className="flex flex-col gap-4">
        <Button onClick={() => disconnect()}>
          <span className="text-sm">Connected to {connector?.name} </span>
          <span className="text-sm">Disconnect</span>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button
        onClick={() => {
          setShowDialog(true);
        }}
      >
        Connect
      </Button>

      <Dialog isVisible={showDialog} onClose={() => setShowDialog(false)}>
        <Dialog.Body className={"flex w-full flex-col items-center align-middle justify-center"}>
          {connectors.map((connector) => (
            <Button disabled={!connector.ready} key={connector.id} onClick={() => connect({ connector })}>
              {connector.name}
              {!connector.ready && " (unsupported)"}
              {isLoading && connector.id === pendingConnector?.id && " (connecting)"}
            </Button>
          ))}

          {error && <div>{error.message}</div>}
        </Dialog.Body>
      </Dialog>
    </>
  );
}
