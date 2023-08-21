"use client";

import React from "react";
import { IndexRange, InfiniteLoader, List, AutoSizer, ListRowProps } from "react-virtualized";
import { defaultAddress, useNftsInfititeQuery } from "../use-nft-hook";
import { Nft } from "../types";
import { MessageWrapper, NftCard } from "../shared";

export const ReactVirtualizedInfiniteLoading = () => {
  const { status, data, error, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useNftsInfititeQuery({ address: defaultAddress });

  const allRows = data ? data.pages.flatMap((d) => d.result) : [];

  return (
    <ReactVirtualizedInfiniteLoader
      hasNextPage={!!hasNextPage}
      isNextPageLoading={isFetching || isFetchingNextPage}
      list={allRows}
      loadNextPage={() => fetchNextPage()}
    />
  );
};

type IsRowLoaded = ({ index }: { index: number }) => boolean;

function ReactVirtualizedInfiniteLoader({
  hasNextPage,
  isNextPageLoading,
  list,
  loadNextPage,
}: {
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  list: Nft[];
  loadNextPage: (params: IndexRange) => Promise<any>;
}) {
  const rowCount = hasNextPage ? list.length + 1 : list.length;

  const loadMoreRows = isNextPageLoading ? (params: IndexRange): any => {} : loadNextPage;

  const isRowLoaded: IsRowLoaded = ({ index }: { index: number }) =>
    !hasNextPage || index < list.length;

  const rowRenderer = ({ index, key, style }: ListRowProps) => {
    let content: React.ReactNode;

    const rowIsNotLoaded = !isRowLoaded({ index });

    if (rowIsNotLoaded) {
      content = (
        <MessageWrapper>{isNextPageLoading ? "Loading..." : "Nothing to load"}</MessageWrapper>
      );
    } else {
      const nft = list.find((d, i) => i === index)!;

      content = (
        <div
          key={`${nft.token_id}-${nft.token_address}-${nft.token_hash}`}
          style={style}
          className="flex items-center justify-center"
        >
          <NftCard key={`${nft.token_id}-${nft.token_address}-${nft.token_hash}`} nft={nft} />
        </div>
      );
    }

    return content;
  };

  return (
    <InfiniteLoader isRowLoaded={isRowLoaded} loadMoreRows={loadMoreRows} rowCount={rowCount}>
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer disableHeight>
          {({ width }) => (
            <List
              ref={registerChild}
              onRowsRendered={onRowsRendered}
              rowRenderer={rowRenderer}
              width={width}
              height={500}
              rowHeight={250}
              rowCount={rowCount}
            />
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  );
}
