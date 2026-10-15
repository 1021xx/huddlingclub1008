import type { Metadata } from "next";
import CreateScreen from "./CreateScreen";

export const metadata: Metadata = {
  title: "초대장 만들기 | Huddling Club",
};

export default function CreatePage() {
  return <CreateScreen />;
}
