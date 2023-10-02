import Link from "next/link";

export default function Page1Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid sm:grid-cols-5 gap-2">
      <nav>
        <ul className="flex flex-col">
          <Link href="/different-examples/ethers-docs">ethers-docs</Link>
          <Link href="/different-examples/debounce-input">debounce input</Link>
          <Link href="/different-examples/legend-state">legend-state</Link>
        </ul>
      </nav>

      <div className="col-span-4">{children}</div>
    </section>
  );
}
