import { PresaleMintComponent } from "@/components/web3-related/presale-mint/presale-mint-component";
import { ParseUnitsAndGwei } from "../../../components/web3-related/parse-units-and-gwei";

export default function Page() {
  return (
    <>
      <h1 className="text-6xl font-bold">web3 examples docs</h1>

      <div className="flex flex-col gap-4">
        <ParseUnitsAndGwei />
        <PresaleMintComponent />
      </div>
    </>
  );
}
