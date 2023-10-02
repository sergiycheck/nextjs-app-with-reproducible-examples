"use client";

import { observable } from "@legendapp/state";
import { Memo } from "@legendapp/state/react";
import React from "react";
import { useInterval } from "usehooks-ts";

export function NonMemoizedCounter() {
  const [counter, setCounter] = React.useState(0);
  const [manualCounter, setManualCounter] = React.useState(0);

  useInterval(() => {
    setCounter((v) => v + 1);
  }, 500);

  return (
    <div>
      <p className="text-3xl">Not memoized counter</p>
      <p className="text-md">interval counter in parent: {counter}</p>

      <NonMemoizedCounterChild title="non memoized manual counter" counter={manualCounter} />

      <button className="btn" onClick={() => setManualCounter((counter) => counter + 1)}>
        increment not memoized manual counter
      </button>
    </div>
  );
}

function NonMemoizedCounterChild({ counter, title }: { counter: number; title: string }) {
  const renderCount = ++React.useRef(0).current;

  return (
    <div>
      <div>Renders of child not memoized counter: {renderCount}</div>
      {title}: {counter}
    </div>
  );
}

export function MemoizedCounterParent() {
  const [counter, setCounter] = React.useState(0);

  const [manualCounter, setManualCounter] = React.useState(0);

  useInterval(() => {
    setCounter((v) => v + 1);
  }, 500);

  return (
    <div>
      <p className="text-3xl">Memoized counter</p>

      <p className="text-md">interval counter in parent: {counter}</p>

      <MemoizedCounterChild title="memoized manual counter" counter={manualCounter} />

      <button className="btn" onClick={() => setManualCounter((counter) => counter + 1)}>
        increment manual counter
      </button>
    </div>
  );
}

const MemoizedCounterChild = React.memo(function MemoizedCounter({
  counter,
  title,
}: {
  counter: number;
  title: string;
}) {
  const renderCount = ++React.useRef(0).current;

  return (
    <div>
      <div>Renders of child memoized counter: {renderCount}</div>
      {title}: {counter}
    </div>
  );
});

const state$ = observable({ counter: 0 });

export function ReactiveCounterWithLegendMemoComponent() {
  const renders = ++React.useRef(0).current;

  useInterval(() => {
    state$.counter.set((counter) => counter + 1);
  }, 500);

  return (
    <div>
      <p className="text-3xl">Reactive counter with legend child memo component</p>
      <p className="text-xl">Fine-grained reactivity</p>
      <p>renders: {renders}</p>
      {/* <p>{state$.counter.use()}</p> */}
      <div>
        Count: <Memo>{state$.counter}</Memo>
      </div>
      <button className="btn" onClick={() => state$.counter.set((counter) => counter + 1)}>
        increment
      </button>
    </div>
  );
}
