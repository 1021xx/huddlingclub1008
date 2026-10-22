"use client";

import RSVPCard, { type RSVPResponse } from "@/components/RSVPCard";

export default function AttendanceForm({ invitationId }: { invitationId: string }) {
  async function submit(value: RSVPResponse) {
    const response = await fetch(`/api/invitations/${invitationId}/rsvps`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    });
    if (!response.ok) throw new Error("참석 응답을 저장하지 못했어요.");
  }

  return <RSVPCard onSubmit={submit} />;
}
