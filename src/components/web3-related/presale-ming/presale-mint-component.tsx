"use client";
import React from "react";
import { useContractWrite } from "wagmi";
import { Button } from "../../shared/button";
import { Dropdown } from "../../shared/dropdown/Dropdown";
import { Divider } from "../../shared/divider/Divider";
import { Input } from "../../shared/input";
import { NftContractAbi } from "./contract-abi";
import { NumericFormat } from "react-number-format";
import { v4 as uuidv4 } from "uuid";

const tokens = [
  {
    name: "XBTC",
    address: "0x9E604f5bFd6C01768a1a1C54c7f867b7F4a5A0c0",
  },
  {
    name: "WETH",
    address: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
  },
  {
    name: "USDT",
    address: "0x7169d38820dfd117c3fa1f22a697dba58d90ba06",
  },
];

const nftContractAddress = "0x1192EA6AffF8B3472cc5084600f85B6000128091";

export function PresaleMintComponent() {
  const chainId = 11155111;

  const [searchTokenName, setSearchTokenName] = React.useState(tokens[0].name);
  const [tokenAddress, setTokenAddress] = React.useState(tokens[0].address);

  const [currentTokenId, setCurrentTokenId] = React.useState<undefined | number>();
  const [currentTokenIdCount, setCurrentTokenIdCount] = React.useState<undefined | number>();

  const [tokenIdsAndCountLookup, setTokenIdsAndCountLookup] = React.useState({});

  const ids = Object.keys(tokenIdsAndCountLookup).map((key) => parseInt(key));
  const counts = Object.values(tokenIdsAndCountLookup).map((value: any) => parseInt(value));

  const {
    data,
    isLoading,
    write: writePresaleMint,
  } = useContractWrite({
    address: nftContractAddress,
    abi: NftContractAbi,
    functionName: "presaleMint",
    args: [[...ids], [...counts], tokenAddress],
    chainId: chainId,
  });

  React.useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  const disabledPresaleMintButton = !tokenAddress || isLoading;

  return (
    <div className="border p-2 rounded-md w-full">
      <p className="text-3xl mb-5">Presale mint with different tokens</p>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Dropdown
            className="w-full"
            menu={
              <>
                {tokens
                  .filter((token) =>
                    searchTokenName
                      ? token.name.toLowerCase().startsWith(searchTokenName.toLowerCase())
                      : true
                  )
                  .map((token) => {
                    return (
                      <Dropdown.Item
                        key={token.name}
                        label={token.name}
                        rightElement={token.address.slice(0, 6) + "..." + token.address.slice(-4)}
                        divAttributes={{
                          onClick: () => {
                            setSearchTokenName(token.name);
                            setTokenAddress(token.address);
                          },
                        }}
                      />
                    );
                  })}
              </>
            }
          >
            <Input
              value={searchTokenName}
              onChange={(e) => {
                setSearchTokenName(e.target.value);
                const token = tokens.find((token) => token.name === e.target.value);
                if (token) {
                  setTokenAddress(token.address);
                }
              }}
              type={"text"}
              name={"search"}
              placeholder={"Select tokens"}
              autoComplete="off"
            />
          </Dropdown>

          <Button
            onClick={() => {
              writePresaleMint();
            }}
            disabled={disabledPresaleMintButton}
          >
            write presale mint
          </Button>
        </div>

        <div className="flex flex-row gap-2">
          <NumericFormat
            placeholder="select id of nft from 0 to 100"
            customInput={Input}
            value={currentTokenId}
            onValueChange={(values, sourceInfo) => {
              const { floatValue } = values;
              if (floatValue != undefined) {
                setCurrentTokenId(floatValue);
              }
            }}
          />
          <NumericFormat
            placeholder="select count of nft from 0 to 100"
            customInput={Input}
            value={currentTokenIdCount}
            onValueChange={(values, sourceInfo) => {
              const { floatValue } = values;
              if (floatValue != undefined) {
                setCurrentTokenIdCount(floatValue);
              }
            }}
          />

          <Button
            onClick={() => {
              if (currentTokenId != undefined && currentTokenIdCount != undefined) {
                setTokenIdsAndCountLookup((prev) => {
                  return {
                    ...prev,
                    [currentTokenId]: currentTokenIdCount,
                  };
                });
              }
            }}
          >
            add nft
          </Button>
        </div>
      </div>

      <Divider />

      <div className="flex flex-col gap-3 ">
        {Object.keys(tokenIdsAndCountLookup).map((tokenId) => {
          const id = uuidv4();
          return (
            <div className="p-2 flex gap-2 items-center" key={id}>
              <p className="text-primary">tokenId: {tokenId}</p>
              <p className="text-primary">count: {(tokenIdsAndCountLookup as any)[tokenId]}</p>
              <Button
                onClick={() => {
                  setTokenIdsAndCountLookup((prev) => {
                    const prevCopy = { ...prev };
                    delete (prevCopy as any)[tokenId];
                    return prevCopy;
                  });
                }}
              >
                delete
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
