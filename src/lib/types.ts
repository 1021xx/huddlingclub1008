export type InvitationInput = {
  title: string;
  date: string;
  location: string;
  body: string;
};

export type Invitation = InvitationInput & { id: string };

export type RsvpInput = {
  name: string;
  status: "yes" | "no";
  /** 응답자 본인을 제외한 동반 인원 */
  companions: number;
};

export type Rsvp = RsvpInput & { id: string; invitation_id: string };
