import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const BotAvatar = () => {
  return (
    <>
      <Avatar className="w-16 h-16 relative right-4 -top-3">
        <AvatarImage src="/logo.svg" className="p-1" />
      </Avatar>
    </>
  );
};
