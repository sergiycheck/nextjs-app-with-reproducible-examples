export type MoralisNetworkType =
  | "eth"
  | "0x1"
  | "goerli"
  | "0x5"
  | "sepolia"
  | "0xaa36a7"
  | "polygon"
  | "0x89"
  | "mumbai"
  | "0x13881"
  | "bsc"
  | "0x38"
  | "bsc testnet"
  | "0x61"
  | "avalanche"
  | "0xa86a"
  | "fantom"
  | "0xfa"
  | "palm"
  | "0x2a15c308d"
  | "cronos"
  | "0x19"
  | "arbitrum"
  | "0xa4b1";

export interface GetNtfsByWalletResponse {
  total: number;
  page: number;
  page_size: number;
  cursor: string | null;
  result: Nft[];
  status: "SYNCED" | "SYNCING";
}

export interface Nft {
  amount: string;
  block_number: string;
  block_number_minted: string;
  contract_type: "ERC721" | "ERC1155";
  last_metadata_sync: string;
  last_token_uri_sync: string;
  metadata: string;
  normalized_metadata: NormalizedMetadata;
  minter_address: string;
  name: string;
  description: string;
  owner_of: string;
  symbol: string;
  token_address: string;
  token_hash: string;
  token_id: string;
  token_uri: string;
}

export type NormalizedMetadata = {
  name: string;
  description: string;
  image: string;
  external_link?: string;
  animation_url?: string;
  attributes?: Attribute[];
};

export type Attribute = {
  trait_type: string;
  value: string | number;
  display_type?:
    | "number"
    | "boost_percentage"
    | "date"
    | "string"
    | "url"
    | "transferrable"
    | "boolean";
  max_value?: number;
  trait_count?: number;
  order?: number;
};
