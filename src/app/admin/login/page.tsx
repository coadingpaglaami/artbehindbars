import TranstackProvider from "@/provider/TranstackProvider";
import { Login } from "@/webcomponents/admin";

export default function AdminLoginPage() {
  return (
  <TranstackProvider>
  <Login />
  </TranstackProvider>
  );
}
