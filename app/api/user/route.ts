import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return { status: 401, body: { error: "Unauthorized" } };
  }

  const res = await db.userApiLimit.findUnique({
    where: { userId },
    select: { maxCount: true },
  });

  const maxCount = res?.maxCount || 5;

  return { status: 200, body: { maxCount } };
}
