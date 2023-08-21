import { OptInputExample } from "../../components/opt-input";
import SentryTestComponent from "../../components/sentry-test";
import { CustomDebouncedInput } from "../../components/you-dont-need/custom-debounced-input";

export default function Page2() {
  return (
    <>
      <h1 className="text-6xl font-bold">page 2</h1>

      <div className="item">
        I am displayed in <code>color: rebeccapurple</code> because the
        <code>utilities</code> layer comes after the <code>base</code> layer. My green border,
        font-size, and padding come from the <code>base</code> layer.
      </div>

      <h2 className="text-5xl">sentry test</h2>
      <SentryTestComponent />
      <OptInputExample />
    </>
  );
}
