import React from "react";
import { InfiniteLoader, List } from "react-virtualized";

const remoteRowCount = 1;

const list: any = [];

function isRowLoaded({ index }: { index: number }) {
  return !!list[index];
}

function loadMoreRows({ startIndex, stopIndex }: { startIndex: number; stopIndex: number }) {
  return fetch(`path/to/api?startIndex=${startIndex}&stopIndex=${stopIndex}`).then((response) => {
    // Store response data in list...
  });
}

function rowRenderer({ key, index, style }: { key: string; index: number; style: any }) {
  return (
    <div key={key} style={style}>
      {list[index]}
    </div>
  );
}

export const ReactVirtualizedNftsScroll = () => (
  <InfiniteLoader isRowLoaded={isRowLoaded} loadMoreRows={loadMoreRows} rowCount={remoteRowCount}>
    {({ onRowsRendered, registerChild }) => (
      <List
        height={200}
        onRowsRendered={onRowsRendered}
        ref={registerChild}
        rowCount={remoteRowCount}
        rowHeight={20}
        rowRenderer={rowRenderer}
        width={300}
      />
    )}
  </InfiniteLoader>
);
