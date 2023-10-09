import { axiosInstance } from "../axios";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import { GetNtfsByWalletResponse, MoralisNetworkType, Nft } from "./types";

export type GetNftsByWalletParams = {
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

// https://deep-index.moralis.io/api-docs/#/account/getNFTs

const queryKeys = {
  nfts: (address?: string) => ["nfts", address] as const,
};

export const getNftsByWallet =
  (params: GetNftsByWalletParams) =>
  async (queryFnContext: QueryFunctionContext<ReturnType<typeof queryKeys.nfts>>) => {
    const cursor = queryFnContext.pageParam;

    const { address, ...queryParams } = params;

    const res = await axiosInstance.get<GetNtfsByWalletResponse>(`api/v2/${address}/nft`, {
      params: {
        normalizeMetadata: true,
        limit,
        ...queryParams,
        cursor,
      },
    });

    return res.data;
  };

export const useNftsInfititeQuery = (params: GetNftsByWalletParams) => {
  return useInfiniteQuery({
    queryKey: ["nfts", params.address],
    keepPreviousData: true,
    queryFn: getNftsByWallet({ ...params }),
    getNextPageParam: (lastPage, pages) => lastPage.cursor,
    enabled: params.address !== undefined,
  });
};
export const defaultAddress = "0xAa5D1125DcD349455dC5f04911BcB315Af10C847";
export const limit = 20;
