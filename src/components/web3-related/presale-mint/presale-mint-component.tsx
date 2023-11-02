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
import toast from "react-hot-toast";
import { useTransactor } from "../hooks/useTransactor";
import { getParsedError } from "../utils/utilsContract";
import { notification } from "../utils/notification";

const tokens = [
  {
    name: "XBTC",
    address: "0xDe41C435BE0aef16d0f0bCEB7289ec2dA7f5C519",
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

const nftContractAddress = "0xE559Ef638396632192B3b31E4395E73b94D19dd3";

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
    writeAsync: writePresaleMintAsync,
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
      notification.info(`${data.hash}`);
    }
  }, [data]);

  const disabledPresaleMintButton = !tokenAddress || isLoading;

  const writeTxn = useTransactor();

  const handleWrite = async () => {
    if (writePresaleMintAsync) {
      try {
        const makeWriteWithParams = () => writePresaleMintAsync();
        await writeTxn(makeWriteWithParams);
      } catch (e: any) {
        const message = getParsedError(e);
        notification.error(message);
      }
    }
  };

  return (
    <div className="border p-2 rounded-md w-full">
      <p className="text-3xl mb-5">Presale mint with different tokens</p>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Dropdown
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

          <div className="flex gap-2">
            <Button
              onClick={() => {
                writePresaleMint();
              }}
              disabled={disabledPresaleMintButton}
            >
              presaleMint
            </Button>

            <Button
              onClick={() => {
                handleWrite();
              }}
              disabled={disabledPresaleMintButton}
            >
              presaleMint with transactor
            </Button>
          </div>
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
