# Figma 화면 프레임

| 경로 | 화면 | Figma 프레임 |
| --- | --- | --- |
| /create | 초대장 만들기 · 입력 및 실시간 미리보기 | [2168:886](https://www.figma.com/design/sYPmFZYYP1gThS3JFE0kO7/?node-id=2168-886) |
| /create | 발행 완료 | [2168:910](https://www.figma.com/design/sYPmFZYYP1gThS3JFE0kO7/?node-id=2168-910) |
| /i/[id] | 초대장 보기 · 참석 신청 및 같은 자리의 완료 상태 | [2168:923](https://www.figma.com/design/sYPmFZYYP1gThS3JFE0kO7/?node-id=2168-923) |
| /i/[id]/responses | 응답 현황 · 0건이면 EmptyState 표시 | [2168:871](https://www.figma.com/design/sYPmFZYYP1gThS3JFE0kO7/?node-id=2168-871) |

`/`는 `/create`로 이동합니다. 발행하면 `POST /api/invitations`로 Supabase에
초대장을 저장한 뒤, 같은 화면에서 발행 완료 상태를 표시합니다.
완료 화면의 `/i/[id]`와 `/i/[id]/responses`는 DB에서 발급한 UUID를 사용합니다.

초대장 페이지는 Supabase의 `invitations`를 조회합니다. 존재하지 않는 UUID나
과거 실습용 ID(`demo`, `empty`)는 404를 표시합니다.
참석 응답은 `POST /api/invitations/[id]/rsvps`로 `rsvps`에 추가하고,
저장 성공 후에만 완료 화면을 표시합니다. 새로고침해도 DB의 응답은 유지됩니다.
응답 현황은 해당 초대장의 실제 응답을 읽어 통계를 계산하며, 응답이 없으면
EmptyState를 표시합니다. 최신 응답은 페이지를 새로고침해서 확인합니다.

입력 중인 미발행 내용은 브라우저 메모리에만 있으므로 새로고침하면 초기화됩니다.
`src/lib/mock.ts`는 참고용으로 남아 있으며 서비스 데이터 조회에 사용하지 않습니다.
