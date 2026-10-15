/** docs/prd.md 기준의 화면 실습용 데이터입니다. 실제 저장 데이터가 아닙니다. */
export type MockInvitation = {
  title: string;
  date: string;
  location: string;
  body: string;
};

export type MockResponse = {
  name: string;
  status: "yes" | "no";
  /** 응답자 본인을 제외한 동반 인원 */
  companions: number;
};

export const mockInvitation: MockInvitation = {
  title: "허들링 클럽 2번째 오프라인 밋업",
  date: "2026년 11월 14일 (토) 09:00",
  location: "서울특별시 중구 세종대로 110",
  body: "함께 배우고 성장하는 허들링 클럽 밋업에 초대합니다.\n서로의 작업을 소개하고 이야기를 나누는 시간을 가져요.\n편안한 마음으로 함께해 주세요!",
};

export const mockResponses: MockResponse[] = [
  { name: "김허들", status: "yes", companions: 1 },
  { name: "이모임", status: "no", companions: 0 },
  { name: "박함께", status: "yes", companions: 2 },
];
