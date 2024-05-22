import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";

export const getMaxCount = async () => {
  const { userId } = await auth();

  if (!userId) {
    return 0;
  }

  const res = await db.userApiLimit.findUnique({
    where: {
      userId,
    },
    select: {
      maxCount: true,
    },
  });

  return res?.maxCount || 5;
};

export const increaseLimit = async () => {
  const { userId } = await auth();

  if (!userId) {
    return;
  }

  const userLimit = await db.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (userLimit) {
    await db.userApiLimit.update({
      where: {
        userId,
      },
      data: {
        count: userLimit.count + 1,
      },
    });
  } else {
    await db.userApiLimit.create({
      data: {
        userId,
        count: 1,
      },
    });
  }
};

export const checkLimit = async () => {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  const userLimit = await db.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  const MAX_FREE_COUNT = await getMaxCount();
  if (!userLimit || userLimit.count < MAX_FREE_COUNT) {
    return true;
  } else {
    return false;
  }
};

export const getLimitCount = async () => {
  const { userId } = await auth();

  if (!userId) {
    return 0;
  }

  const userLimit = await db.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!userLimit) {
    return 0;
  } else {
    return userLimit.count;
  }
};
