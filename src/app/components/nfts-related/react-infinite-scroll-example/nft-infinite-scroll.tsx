"use client";

import React from "react";
import Image from "next/image";
import { NO_NFT_IMAGE_PATH, useNftNormalizedMetadata } from "../utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { defaultAddress, limit, useNftsInfititeQuery } from "../use-nft-hook";
import { Nft } from "../types";

export function NftsInfititeScroll() {
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    useNftsInfititeQuery({ address: defaultAddress });

  const [itemsLength, setItemsLength] = React.useState(limit);
  const fetchMoreData = () => {
    setItemsLength((prev) => prev + limit);
    fetchNextPage();
  };

  return status === "loading" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {(error as any)?.message}</p>
  ) : (
    <>
      <InfiniteScroll
        dataLength={itemsLength}
        next={fetchMoreData}
        hasMore={true}
        height={400}
        loader={<div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="grid grid-cols-2 gap-4">
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
