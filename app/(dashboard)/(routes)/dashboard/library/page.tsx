import { Heading } from "@/components/heading";
import { FileStackIcon } from "lucide-react";
import { checkSubscription } from "@/lib/subscription";
import { TabsDemo } from "@/components/settings-tas";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const imgs = await db.imageGen.findMany({
    where: {
      userId: userId,
    },
  });
  const voices = await db.voices.findMany({
    where: {
      userId: userId,
    },
  });

  return (
    <>
      <Heading
        title="Library"
        description="Manage your generated images and voices."
        icon={FileStackIcon}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div>
        <div className="w-full flex items-center justify-center py-4">
          <TabsDemo imgs={imgs} isPro={isPro} voices={voices} />
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
