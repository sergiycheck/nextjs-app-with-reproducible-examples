"use client";

import React from "react";
import { IndexRange, InfiniteLoader, List, AutoSizer, ListRowProps } from "react-virtualized";
import { useInfiniteQueryProjects } from "../hooks/use-projects";

export const ReactVirtualizedInfiniteLoading = () => {
  const { status, data, error, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQueryProjects();

  const allRows = data ? data.pages.flatMap((d) => d.rows) : [];

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
  list: string[];
  loadNextPage: (params: IndexRange) => Promise<any>;
}) {
  const rowCount = hasNextPage ? list.length + 1 : list.length;

  const loadMoreRows = isNextPageLoading ? (params: IndexRange): any => {} : loadNextPage;

  const isRowLoaded: IsRowLoaded = ({ index }: { index: number }) =>
    !hasNextPage || index < list.length;

  const rowRenderer = ({ index, key, style }: ListRowProps) => {
    let content;

    if (!isRowLoaded({ index })) {
      content = "Loading...";
    } else {
      content = list.find((d, i) => i === index);
    }

    return (
      <div key={key} style={style}>
        {content}
      </div>
    );
  };

  return (
    <InfiniteLoader isRowLoaded={isRowLoaded} loadMoreRows={loadMoreRows} rowCount={rowCount}>
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer disableHeight>
          {({ width, height }) => (
            <List
              ref={registerChild}
              onRowsRendered={onRowsRendered}
              rowRenderer={rowRenderer}
              width={width}
              height={500}
              rowHeight={30}
              rowCount={rowCount}
            />
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  );
}
