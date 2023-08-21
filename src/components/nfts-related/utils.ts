import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axios";
import { Attribute, Nft } from "./types";

export interface NftMetadata {
  name: string;
  description?: string | null;
  imageUrl?: string;
  animationUrl?: string | null;
  externalLink?: string | null;
  attributes?: Attribute[];
}

export const UNKNOWN_NFT_NAME = "Unknown";
export const NO_NFT_IMAGE_PATH = "https://via.placeholder.com/150";

export const modifyImgUrlIfNeeded = (url?: string) => {
  if (!url) {
    return NO_NFT_IMAGE_PATH;
  }

  if (url.slice(0, 7) === "ipfs://") {
    url = "https://ipfs.io/ipfs/" + url.slice(7, url.length);
  }

  return url;
};

export const useNftNormalizedMetadata = (nft?: Nft) => {
  const normalizedMetadata = nft?.normalized_metadata;
  const tokenUri = nft?.token_uri;
  const isMetadataExist = normalizedMetadata?.name && normalizedMetadata?.description;

  const fetchMetadata = async () => {
    if (!isMetadataExist && tokenUri) {
      // if metadata is not exist, we fetch it from tokenUri
      // otherwise we use metadata from current nft
      try {
        const response = await axiosInstance.get(tokenUri);
        const tokenUriData = response.data;

        const normalizedTokenMetadata = {
          name: tokenUriData.name || UNKNOWN_NFT_NAME,
          description: tokenUriData.description || UNKNOWN_NFT_NAME,
          imageUrl: modifyImgUrlIfNeeded(tokenUriData.image || tokenUriData.nft.url),
          animationUrl: tokenUriData.animation_url,
          externalLink: tokenUriData.external_link,
          attributes: tokenUriData.attributes,
        };

        return normalizedTokenMetadata;
      } catch (error) {
        // if no data in tokenUri, return unknown nft

        return {
          name: nft.name || UNKNOWN_NFT_NAME,
          description: nft.description || UNKNOWN_NFT_NAME,
          imageUrl: NO_NFT_IMAGE_PATH,
          animationUrl: "",
          externalLink: "",
          attributes: [],
        };
      }
    } else {
      return {
        name: normalizedMetadata?.name || nft?.name || UNKNOWN_NFT_NAME,
        description: normalizedMetadata?.description || nft?.description || UNKNOWN_NFT_NAME,
        imageUrl: modifyImgUrlIfNeeded(normalizedMetadata?.image),
        animationUrl: normalizedMetadata?.animation_url,
        externalLink: normalizedMetadata?.external_link,
        attributes: normalizedMetadata?.attributes,
      };
    }
  };

  return useQuery(["nftMetadata", nft?.token_address, nft?.token_id], fetchMetadata, {
    enabled: !!nft,
    cacheTime: 1000 * 60 * 60 * 24,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
