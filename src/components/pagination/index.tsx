"use client";

import { QueryFunctionContext, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { NextRequest } from "next/server";
import React from "react";

type GetProjectResponse = {
  data: { id: string; name: string }[];
  nextId: string;
  previousId: string;
};

type GetProjctsParams = {
  address?: string;
  cursor?: string;
};

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export async function getProject(params: WithRequired<GetProjctsParams, "address">) {
  const { cursor: cursorstr, address } = params;

  const cursor = parseInt(cursorstr || "0");

  const pageSize = 5;

  const data = Array(pageSize)
    .fill(0)
    .map((_, i) => {
      return {
        name: "Project " + (i + cursor) + ` (${address})`,
        id: i + cursor,
      };
    });

  const nextId = cursor < 5 ? data[data.length - 1].id + 1 : null;
  const previousId = cursor > -5 ? data[0].id - pageSize : null;

  return new Promise((resolve) => setTimeout(() => resolve({ data, nextId, previousId }), 500));
}

export type AccountContext = {
  address: string | undefined;
  setAddress: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const AccountContext = React.createContext<AccountContext>({
  address: undefined,
  setAddress: () => {},
});

export const AccountProvider = ({ children }: { children: React.ReactNode }) => {
  const [address, setAddress] = React.useState<string | undefined>(undefined);
  return (
    <AccountContext.Provider value={{ address, setAddress }}>{children}</AccountContext.Provider>
  );
};

export const ChooseAccount = () => {
  const { address, setAddress } = React.useContext(AccountContext);
  return (
    <div>
      <div>Current account: {address}</div>
      <button className="btn" onClick={() => setAddress("0x123")}>
        account 0x123
      </button>
      <button className="btn" onClick={() => setAddress("0x321")}>
        account 0x321
      </button>
      <button className="btn" onClick={() => setAddress(undefined)}>
        clear
      </button>
    </div>
  );
};

const getProjects = async ({ address, cursor }: GetProjctsParams) => {
  try {
    const response = (await getProject({ address: address ?? "", cursor })) as GetProjectResponse;
    return response;
  } catch (error) {
    console.error(error);
  }
};

const useProjectsQuery = (params: GetProjctsParams) =>
  useInfiniteQuery({
    queryKey: ["projects", params.address],
    queryFn: (context: QueryFunctionContext) => {
      return getProjects({ ...params, cursor: context.pageParam });
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage?.previousId;
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.nextId;
    },
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  });

export const RequiredToChooseAccountWrapper = () => {
  const { address } = React.useContext(AccountContext);

  if (!address) {
    return <div>Please choose an account</div>;
  }

  return <ProjectPaginationByAccount />;
};

export const ProjectPaginationByAccount = () => {
  const { address } = React.useContext(AccountContext);

  const {
    data,
    isLoading: loading,
    fetchNextPage,
    hasNextPage,
    fetchPreviousPage,
    hasPreviousPage,
  } = useProjectsQuery({
    address,
  });

  React.useEffect(() => {
    function fetchNextPageWhileHasNextPage() {
      if (hasNextPage) {
        fetchNextPage();
      }
    }

    fetchNextPageWhileHasNextPage();
  }, [hasNextPage, fetchNextPage]);

  return (
    <>
      <h1 className="text-xl">Project List</h1>

      <button
        className="btn"
        onClick={() => {
          fetchPreviousPage();
        }}
        disabled={!hasPreviousPage}
      >
        previous
      </button>

      {loading && <div>Loading...</div>}

      <ul className="flex flex-col gap-2">
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page?.data.map((item) => (
              <li className="p-2" key={item.id}>
                {item.name}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      {loading && <div>Loading...</div>}

      <button
        className="btn"
        onClick={() => {
          fetchNextPage();
        }}
        disabled={!hasNextPage}
      >
        next
      </button>
    </>
  );
};

export const PaganationExamplewithServerAndTanstackQuery = () => {
  return (
    <AccountProvider>
      <ChooseAccount />
      <RequiredToChooseAccountWrapper />
    </AccountProvider>
  );
};
