import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthrized", { status: 401 });
  }

  const isPro = await checkSubscription();
  return new NextResponse(JSON.stringify(isPro), { status: 200 });
}
