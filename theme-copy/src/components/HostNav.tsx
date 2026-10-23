import Link from "next/link";
import { signOut } from "@/app/login/actions";

export default function HostNav() {
  return (
    <div className="party-host-nav flex items-center justify-between gap-stack-md">
      <Link href="/host" className="focus-visible:component-focus">내 초대장</Link>
      <form action={signOut}><button type="submit" className="cursor-pointer focus-visible:component-focus">로그아웃</button></form>
    </div>
  );
}
