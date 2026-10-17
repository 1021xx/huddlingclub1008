"use client";

import { useState } from "react";
import RSVPCard, { type RSVPResponse } from "@/components/RSVPCard";

export default function AttendanceForm() {
  const [response, setResponse] = useState<RSVPResponse>();

  return (
    <div className="space-y-stack-sm">
      <RSVPCard
        state={response ? "done" : "form"}
        response={response}
        onSubmit={value => setResponse(value)}
        demo
      />
      <p className="text-center text-caption-md text-text-tertiary">
        실습용 초대장이에요. 응답은 서버에 저장되지 않으며 새로고침하면 초기화돼요.
      </p>
    </div>
  );
}
