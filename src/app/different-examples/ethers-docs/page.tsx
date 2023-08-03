import { ParseUnitsAndGwei } from "./componets/parse-units-and-gwei";

export default function Page() {
  return (
    <>
      <h1 className="text-6xl font-bold">ethers examples docs</h1>

      <h2 className="text-5xl font-bold">parse examples</h2>
      <ParseUnitsAndGwei />
    </>
  );
}
