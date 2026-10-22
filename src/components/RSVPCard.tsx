"use client";
import { useId, useState, type FormEvent } from "react";
import Input from "./Input";
import Label from "./Label";
import RadioOption from "./RadioOption";
import Stepper from "./Stepper";
import Button from "./Button";
import SuccessIcon from "./SuccessIcon";
import InfoRow from "./InfoRow";
export type RSVPResponse = {
    name: string;
    status: "yes" | "no";
    companions: number;
};
export type RSVPCardProps = {
    className?: string;
    state?: "form" | "done";
    response?: RSVPResponse;
    onSubmit?: (response: RSVPResponse) => void | Promise<void>;
    demo?: boolean;
};
export default function RSVPCard({ className = "", state = "form", response, onSubmit, demo = false }: RSVPCardProps) {
    const groupId = useId();
    const [name, setName] = useState("");
    const [status, setStatus] = useState<"yes" | "no">("yes");
    const [companions, setCompanions] = useState(1);
    const [sent, setSent] = useState<RSVPResponse>();
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");
    const done = state === "done" || Boolean(sent);
    const result = response ?? sent ?? { name: "김허들", status: "yes", companions: 1 };
    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!onSubmit || !name.trim() || pending)
            return;
        const data = { name: name.trim(), status, companions };
        setPending(true);
        setError("");
        try {
            await onSubmit(data);
            setSent(data);
        }
        catch {
            setError("응답을 보내지 못했어요. 다시 시도해 주세요.");
        }
        finally {
            setPending(false);
        }
    }
    return (<section className={`flex w-full flex-col gap-stack-lg rounded-card bg-surface-default px-page-horizontal py-stack-lg ${className}`}>
      {done ? <>
        <div role="status" className="flex flex-col items-center gap-stack-sm py-section-lg text-center">
          <SuccessIcon />
          <h3 className="text-title-lg text-text-strong">{demo ? "참석 신청을 완료했어요" : "참석 여부를 보냈어요"}</h3>
          <p className="text-body-md text-text-secondary">{demo ? "실습용으로 응답을 확인했어요." : "호스트에게 응답이 전달됐어요."}</p>
        </div>
        <div className="space-y-inline-md rounded-card bg-surface-subtle p-stack-md">
          <InfoRow type="spread" label="이름" value={result.name}/>
          <InfoRow type="spread" label="참석 여부" value={result.status === "yes" ? "참석" : "불참"}/>
          <InfoRow type="spread" label="동반 인원" value={`${result.companions}명`}/>
        </div>
      </> : <>
        <header className="space-y-inline-compact text-center">
          <h3 className="text-heading-lg text-text-strong">참석 여부 알려주기</h3>
          <p className="text-body-md text-text-secondary">이름과 참석 여부를 남겨주세요.</p>
        </header>
        <form onSubmit={submit} className="space-y-stack-lg">
          <fieldset disabled={pending} className="space-y-stack-lg">
            <Input label="이름" maxLength={100} placeholder="이름을 입력해주세요" value={name} onChange={event => setName(event.target.value)}/>
            <fieldset className="space-y-inline-md">
              <legend className="text-label-preserved text-text-strong">참석 여부 <span className="text-required-preserved text-feedback-error">필수</span></legend>
              <div className="flex">
                <RadioOption className="flex-1" label="참석" name={groupId} value="yes" checked={status === "yes"} onChange={() => setStatus("yes")} required showRequired={false}/>
                <RadioOption className="flex-1" label="불참" name={groupId} value="no" checked={status === "no"} onChange={() => setStatus("no")} required showRequired={false}/>
              </div>
            </fieldset>
            <div role="group" aria-labelledby={groupId + "-companions"} className="space-y-inline-md">
              <Label id={groupId + "-companions"} label="동반 인원"/>
              <div><Stepper value={companions} onValueChange={setCompanions} disabled={pending}/></div>
              <p className="text-caption-md text-text-tertiary">본인을 제외하고 함께 오는 인원이에요.</p>
            </div>
          </fieldset>
          <Button size="lg" type="submit" className="w-full" disabled={!name.trim() || pending}>{pending ? "보내는 중…" : "참석 여부 보내기"}</Button>
          {!onSubmit && <p className="text-caption-md text-text-tertiary">실습용 미리보기입니다. 응답은 저장되지 않아요.</p>}
          {error && <p role="alert" className="text-caption-md text-feedback-error">{error}</p>}
        </form>
      </>}
    </section>);
}
