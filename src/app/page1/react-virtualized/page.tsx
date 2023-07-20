import { ReactVirtualizedInfiniteLoading } from "@/app/components/nfts-related/react-virtualized/react-virtualized-nfts-scroll";

export default function Page() {
  return (
    <>
      <h1 className="text-6xl font-bold">React virtual infinite loader</h1>
      <ReactVirtualizedInfiniteLoading />
    </>
  );
}
