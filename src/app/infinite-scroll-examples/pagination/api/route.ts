import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cursor = parseInt(searchParams.get("cursor") ?? "") || 0;
  const address = searchParams.get("address") ?? "";

  const pageSize = 5;

  const data = Array(pageSize)
    .fill(0)
    .map((_, i) => {
      return {
        name: "Project " + (i + cursor) + ` (${address})`,
        id: i + cursor,
      };
    });

  const nextId = cursor < 10 ? data[data.length - 1].id + 1 : null;
  const previousId = cursor > -10 ? data[0].id - pageSize : null;

  setTimeout(() => NextResponse.json({ data, nextId, previousId }), 1000);
}
