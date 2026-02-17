import { SocketProvider } from "@/context/SocketProvider";
import { UserProfile } from "@/webcomponents/account";

interface UserProfileProps {
  params: Promise<{
    userId: string;
  }>;
}

export default async function UserProfilePage({ params }: UserProfileProps) {
  const { userId } = await params;

  console.log(userId);

  return (
    <SocketProvider>
      <UserProfile profileId={userId} />
    </SocketProvider>
  );
}
