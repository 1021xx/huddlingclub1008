import Link from "next/link";
import { signOut } from "@/app/login/actions";

export default function HostNav() {
  return (
    <div className="flex items-center justify-between gap-stack-md text-label-md text-text-tertiary">
      <Link href="/host" className="underline underline-offset-4">내 초대장</Link>
      <form action={signOut}><button type="submit" className="cursor-pointer underline underline-offset-4">로그아웃</button></form>
    </div>
  );
}
