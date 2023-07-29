import Link from "next/link";

export default function Page1Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid sm:grid-cols-3 gap-4">
      <nav>
        <ul className="flex flex-col">
          <Link href="/infinite-scroll-examples">react-infinite-scroll-component</Link>
          <Link href="/infinite-scroll-examples/react-virtualized">react-virtualized</Link>
          <Link href="/infinite-scroll-examples/tanstack-query-virtual">
            tanstack-query-virtual
          </Link>
          <Link href="/infinite-scroll-examples/pagination">pagination</Link>
        </ul>
      </nav>

      <div className="col-span-2">{children}</div>
    </section>
  );
}
