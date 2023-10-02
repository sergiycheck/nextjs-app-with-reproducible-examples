import {
  NonMemoizedCounter,
  MemoizedCounterParent,
  ReactiveCounterWithLegendMemoComponent,
} from "@/components/legend-state/counter";

export default function Page() {
  return (
    <>
      <h1 className="text-6xl font-bold">Counters examples</h1>
      <div className="flex flex-col gap-4">
        <NonMemoizedCounter />
        <MemoizedCounterParent />
        <ReactiveCounterWithLegendMemoComponent />
      </div>
    </>
  );
}
