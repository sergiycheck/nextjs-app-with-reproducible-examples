"use client";

import React from "react";
import { defaultAddress, limit, useNftsInfititeQuery } from "../use-nft-hook";
import { MessageWrapper, NftCard } from "../shared";
import InfiniteScroll from "react-infinite-scroll-component";

export function NftsInfititeScroll() {
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    useNftsInfititeQuery({ address: defaultAddress });

  const [itemsLength, setItemsLength] = React.useState(limit);
  const fetchMoreData = () => {
    setItemsLength((prev) => prev + limit);
    fetchNextPage();
  };

  return status === "loading" ? (
    <MessageWrapper>Loading...</MessageWrapper>
  ) : status === "error" ? (
    <MessageWrapper>Error: {(error as any)?.message}</MessageWrapper>
  ) : (
    <div className="mt-4">
      <InfiniteScroll
        dataLength={itemsLength}
        next={fetchMoreData}
        hasMore={true}
        height={400}
        loader={
          <MessageWrapper>
            <>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</>
          </MessageWrapper>
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

      {/* <div className="flex justify-center">
        <button onClick={() => fetchMoreData()} disabled={!hasNextPage || isFetchingNextPage}>
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div> */}
    </div>
  );
}
