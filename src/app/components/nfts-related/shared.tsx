import Image from "next/image";
import { Nft } from "./types";
import { NO_NFT_IMAGE_PATH, useNftNormalizedMetadata } from "./utils";

export const MessageWrapper = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className="flex justify-center w-100">
      <div className="p-4 text-center">{props.children}</div>
    </div>
  );
};

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
