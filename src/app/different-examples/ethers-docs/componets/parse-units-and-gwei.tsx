"use client";

import { NumericFormat } from "react-number-format";
import { formatUnits, formatEther } from "ethers";

export function ParseUnitsAndGwei() {
  const valueInWei = "1000000000000000000"; // 1 Ether in wei
  const valueInEther = formatEther(valueInWei);

  const decimals = 9; // Gwei has 9 decimals
  const valueInGwei = formatUnits(valueInWei, decimals);

  return (
    <>
      <p className="text-primary">valueInEther</p>
      <NumericFormat value={valueInEther} displayType={"text"} thousandSeparator={true} />

      <p className="text-primary">valueInGwei</p>
      <NumericFormat value={valueInGwei} displayType={"text"} thousandSeparator={true} />
    </>
  );
}
