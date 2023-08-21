import Link from "next/link";

export default function Page1Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid sm:grid-cols-3 gap-4">
      <nav>
        <ul className="flex flex-col">
          <Link href="/different-examples/ethers-docs">ethers-docs</Link>
          <Link href="/different-examples/debounce-input">debounce input</Link>
        </ul>
      </nav>

      <div className="col-span-2">{children}</div>
    </section>
  );
}
