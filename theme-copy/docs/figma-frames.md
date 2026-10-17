# Figma 화면 프레임

| 경로 | 화면 | Figma 프레임 |
| --- | --- | --- |
| /create | 초대장 만들기 · 입력 및 실시간 미리보기 | [2168:886](https://www.figma.com/design/sYPmFZYYP1gThS3JFE0kO7/?node-id=2168-886) |
| /create | 발행 완료 | [2168:910](https://www.figma.com/design/sYPmFZYYP1gThS3JFE0kO7/?node-id=2168-910) |
| /i/[id] | 초대장 보기 · 참석 신청 및 같은 자리의 완료 상태 | [2168:923](https://www.figma.com/design/sYPmFZYYP1gThS3JFE0kO7/?node-id=2168-923) |
| /i/[id]/responses | 응답 현황 · 0건이면 EmptyState 표시 | [2168:871](https://www.figma.com/design/sYPmFZYYP1gThS3JFE0kO7/?node-id=2168-871) |

현재 발행 완료는 같은 /create 화면 안의 실습용 상태 전환입니다.
완료 화면에서 /i/demo와 /i/demo/responses의 전체 주소를 복사할 수 있고, ‘내 초대장 보기’로 /i/demo에 이동합니다.
두 링크는 기존 mock 데이터를 표시하며, 만들기에서 입력한 내용은 저장되지 않습니다.
입력값은 화면 전환 중 유지되며 페이지를 새로고침하면 초기화됩니다.

`/i/demo`에서 `src/lib/mock.ts`의 초대장 데이터를 확인할 수 있습니다.
`/i/demo`는 기존 초대장, `/i/empty`는 응답이 없는 초대장입니다. 그 외 ID는 404를 표시합니다.
참석 응답은 현재 화면의 메모리에만 유지되며 응답 현황 가짜 데이터에는 추가되지 않습니다.
`/i/demo/responses`에서 기존 응답 3개, `/i/empty/responses`에서 0건과 EmptyState를 확인할 수 있습니다.
