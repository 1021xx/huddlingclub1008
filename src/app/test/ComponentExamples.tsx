import Label from "@/components/Label";
import InputField from "@/components/InputField";
import Input from "@/components/Input";
import TextareaField from "@/components/TextareaField";
import Textarea from "@/components/Textarea";
import Radio from "@/components/Radio";
import RadioOption from "@/components/RadioOption";
import StepButton from "@/components/StepButton";
import Stepper from "@/components/Stepper";
import SuccessIcon from "@/components/SuccessIcon";
import AttendanceBadge from "@/components/AttendanceBadge";
import InfoRow from "@/components/InfoRow";
import StatCard from "@/components/StatCard";
import EmptyState from "@/components/EmptyState";
import SectionHeader from "@/components/SectionHeader";
import NavBar from "@/components/NavBar";
import CopyLinkField from "@/components/CopyLinkField";
import InvitationCover from "@/components/InvitationCover";
import RSVPCard from "@/components/RSVPCard";
import Image from "@/components/Image";
import None from "@/components/icon/none";
import Plus from "@/components/icon/plus";
import Minus from "@/components/icon/minus";
import Check from "@/components/icon/check";
import ResponseRowTrue from "@/components/ResponseRow/true";
import type { ReactNode } from "react";
function Example({ name, children }: {
    name: string;
    children: ReactNode;
}) { return <section className="space-y-stack-md rounded-card bg-surface-default p-page-horizontal"><h2 className="text-heading-md">{name}</h2><div className="flex flex-wrap items-start gap-stack-lg">{children}</div></section>; }
export default function ComponentExamples() {
    return <>
    <Example name="icon/none · icon/plus · icon/minus · icon/check"><None /><Plus /><Minus /><Check /></Example>
    <Example name="Label"><Label /><Label label="선택 항목" required={false}/></Example>
    <Example name="InputField">{(["default", "focus", "active"] as const).map(state => <InputField key={state} state={state} aria-label={state + " 입력"} defaultValue={state === "active" ? "입력된 내용" : undefined}/>)}</Example>
    <Example name="Input"><Input /><Input label="안내 문구 포함" showHelper/></Example>
    <Example name="TextareaField">{(["default", "focus", "active"] as const).map(state => <TextareaField key={state} state={state} aria-label={state + " 여러 줄 입력"} defaultValue={state === "active" ? "게스트에게 전할 초대 글을 적어주세요" : undefined}/>)}</Example>
    <Example name="Textarea"><Textarea rows={2} label="제목"/><Textarea rows={4} label="본문" showHelper/></Example>
    <Example name="Radio"><Radio aria-label="기본"/><Radio aria-label="선택" state="selected"/><Radio aria-label="비활성" state="disabled"/></Example>
    <Example name="RadioOption"><RadioOption label="참석" name="example-attendance" value="yes" state="selected" showRequired={false}/><RadioOption label="불참" name="example-attendance" value="no" showRequired={false}/></Example>
    <Example name="StepButton"><StepButton aria-label="줄이기"/><StepButton aria-label="비활성 줄이기" state="disabled"/><StepButton aria-label="늘리기" icon={<Plus compact/>}/></Example>
    <Example name="Stepper"><Stepper /><Stepper defaultValue={0}/><Stepper disabled/></Example>
    <Example name="SuccessIcon"><SuccessIcon /></Example>
    <Example name="AttendanceBadge"><AttendanceBadge status="yes"/><AttendanceBadge status="no"/></Example>
    <Example name="InfoRow"><InfoRow /><InfoRow type="spread"/></Example>
    <Example name="StatCard"><StatCard /><StatCard highlight/></Example>
    <Example name="EmptyState"><EmptyState /></Example>
    <Example name="SectionHeader"><SectionHeader /></Example>
    <Example name="NavBar"><NavBar /></Example>
    <Example name="CopyLinkField"><CopyLinkField url="https://example.com/i/demo"/></Example>
    <Example name="ResponseRow/true"><ResponseRowTrue /></Example>
    <Example name="Image"><Image type="character" alt="숫자 2 풍선을 든 펭귄"/><Image type="flag" alt="깃발"/></Example>
    <Example name="InvitationCover"><InvitationCover /></Example>
    <Example name="RSVPCard"><div className="w-full max-w-invitation"><RSVPCard /></div><div className="w-full max-w-invitation"><RSVPCard state="done"/></div></Example>
    </>;
}
