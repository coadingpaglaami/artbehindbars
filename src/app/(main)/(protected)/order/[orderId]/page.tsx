import { OrderDetail } from "@/webcomponents/protected";

interface UserProfileProps {
  params: Promise<{
    orderId: string;
  }>;
}

export default async function UserProfilePage({ params }: UserProfileProps) {
  const { orderId } = await params;

  console.log(orderId);

  return <OrderDetail params={orderId} />;
}
