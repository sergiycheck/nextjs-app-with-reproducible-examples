"use client";
import React from "react";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import { GetNtfsByWalletResponse, MoralisNetworkType, Nft } from "./types";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { axiosInstance } from "./axios";
import { NO_NFT_IMAGE_PATH, useNftNormalizedMetadata } from "./utils";
import InfiniteScroll from "react-infinite-scroll-component";

type GetNftsByWalletParams = {
  address?: string;
  chain?: MoralisNetworkType;
  cursor?: string;

  format?: string;
  limit?: number;
  disable_total?: boolean;
  token_addresses?: string;
  normalizeMetadata?: boolean;
  media_items?: boolean;
};

const defaultAddress = "0xAa5D1125DcD349455dC5f04911BcB315Af10C847";

const queryKeys = {
  nfts: () => ["nfts"] as const,
};

const limit = 20;

const getNftsByWallet =
  (params: GetNftsByWalletParams) =>
  async (queryFnContext: QueryFunctionContext<ReturnType<typeof queryKeys.nfts>>) => {
    const cursor = queryFnContext.pageParam;

    const { address, ...queryParams } = params;

    const res = await axiosInstance.get<GetNtfsByWalletResponse>(`api/v2/${address}/nft`, {
      params: {
        normalizeMetadata: true,
        disable_total: false,
        limit,
        ...queryParams,
        cursor,
      },
    });

    return res.data;
  };

export function NftsInfititeScroll() {
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["nfts"],
      keepPreviousData: true,
      queryFn: getNftsByWallet({ address: defaultAddress }),
      getNextPageParam: (lastPage, pages) => lastPage.cursor,
    });

  const [itemsLength, setItemsLength] = React.useState(limit);
  const fetchMoreData = () => {
    setItemsLength((prev) => prev + limit);
    fetchNextPage();
  };

  return status === "loading" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error?.message}</p>
  ) : (
    <>
      <InfiniteScroll
        dataLength={itemsLength}
        next={fetchMoreData}
        hasMore={!!hasNextPage}
        loader={<div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="grid grid-cols-4 gap-4">
          {data?.pages?.map((dataForPage, i) => (
            <React.Fragment key={i}>
              {dataForPage?.result?.map((nft) => {
                return (
                  <NftCard
                    key={`${nft.token_id}-${nft.token_address}-${nft.token_hash}`}
                    nft={nft}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </InfiniteScroll>

      <div className="flex justify-center">
        <button onClick={() => fetchMoreData()} disabled={!hasNextPage || isFetchingNextPage}>
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
    </>
  );
}

export const NftCard = ({ nft }: { nft: Nft }) => {
  const { data: metadata, isLoading } = useNftNormalizedMetadata(nft);

  return (
    <div className="flex flex-col gap-2">
      <Image
        src={metadata ? metadata?.imageUrl : NO_NFT_IMAGE_PATH}
        width={180}
        height={37}
        alt={metadata?.name ?? "NFT"}
      />
      <h2>{metadata?.name}</h2>
    </div>
  );
};
