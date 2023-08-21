import { useInfiniteQuery } from "@tanstack/react-query";

async function fetchServerPage(
  limit: number,
  offset: number = 0
): Promise<{ rows: string[]; nextOffset: number }> {
  const rows = new Array(limit).fill(0).map((e, i) => `Async loaded row #${i + offset * limit}`);

  await new Promise((r) => setTimeout(r, 500));

  return { rows, nextOffset: offset + 1 };
}

export const useInfiniteQueryProjects = () => {
  return useInfiniteQuery(["projects"], (ctx) => fetchServerPage(10, ctx.pageParam), {
    getNextPageParam: (_lastGroup, groups) => groups.length,
  });
};
