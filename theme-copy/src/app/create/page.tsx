import type { Metadata } from "next";
import CreateScreen from "./CreateScreen";
import { requireUser } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: "초대장 만들기 | Huddling Club",
};

export default async function CreatePage() {
  await requireUser("/create");
  return <CreateScreen />;
}
