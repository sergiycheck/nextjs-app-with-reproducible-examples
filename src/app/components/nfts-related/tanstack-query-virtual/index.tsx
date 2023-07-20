"use client";

import React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { MessageWrapper } from "../shared";
import { useInfiniteQueryProjects } from "../hooks/use-projects";

export const TanstackQueryVirtualInfiniteLoading = () => {
  const { status, data, error, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQueryProjects();

  const allRows = data ? data.pages.flatMap((d) => d.rows) : [];

  const parentRef = React.useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  });

  React.useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (lastItem.index >= allRows.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allRows.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex">
        {status === "loading" ? (
          <MessageWrapper>Loading...</MessageWrapper>
        ) : status === "error" ? (
          <MessageWrapper>Error: {(error as Error).message}</MessageWrapper>
        ) : (
          <div
            ref={parentRef}
            className="max-w-full border-2 border-gray-500"
            style={{
              height: `500px`,
              width: `100%`,
              overflow: "auto",
            }}
          >
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: "100%",
                position: "relative",
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const isLoaderRow = virtualRow.index > allRows.length - 1;
                const post = allRows[virtualRow.index];

                return (
                  <div
                    key={virtualRow.index}
                    className={"flex justify-center items-center"}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    {isLoaderRow ? (
                      <MessageWrapper>
                        {hasNextPage ? "Loading more..." : "Nothing more to load"}
                      </MessageWrapper>
                    ) : (
                      <MessageWrapper>{post}</MessageWrapper>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <MessageWrapper>
        {isFetching && !isFetchingNextPage ? "Background Updating..." : null}
      </MessageWrapper>
    </div>
  );
};
