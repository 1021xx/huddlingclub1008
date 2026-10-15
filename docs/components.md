# Figma 컴포넌트

원본: 파일 `sYPmFZYYP1gThS3JFE0kO7`, Components `2168:966`.
미리보기: `/test`.

## 의존성에 따른 구현 순서

1. 기본 요소: `icon/none`, `icon/plus`, `icon/minus`, `icon/check`, `Label`, `AttendanceBadge`, `InputField`, `TextareaField`, `Radio`, `Image`, `SectionHeader`, `StatCard`, `InfoRow`, `EmptyState`.
2. 조합 요소: `SuccessIcon → icon/check`, `StepButton → icon/minus`, `Input → Label + InputField`, `Textarea → Label + TextareaField`, `RadioOption → Radio + Label`, `NavBar → icon/none`, `ResponseRow/true → AttendanceBadge`.
3. 상위 요소: `Stepper → StepButton + icon/minus + icon/plus`, `CopyLinkField → InputField + Button`, `InvitationCover → SectionHeader + Image`.
4. 최종 조합: `RSVPCard → Input + Label + RadioOption + Stepper + Button + SuccessIcon + InfoRow`.

Figma에서 이름에 `/`가 있는 항목은 같은 이름의 하위 폴더로 표현합니다.
이미지 컴포넌트의 실제 Figma 이름은 `Image`이므로 `Image.tsx`로 구현했습니다.
캐릭터와 깃발은 Figma에서 PNG로 내보내 `public/figma/`에 저장했습니다.
SVG는 각 인스턴스의 원본 크기와 색상을 유지합니다.
추가 고정 치수와 보존된 텍스트 스타일은 `src/app/globals.css`에 토큰으로 정의했습니다.

## 사용 예시

```tsx
import Input from "@/components/Input";
import Image from "@/components/Image";
import RSVPCard from "@/components/RSVPCard";
import ResponseRowTrue from "@/components/ResponseRow/true";

<Input label="이름" placeholder="이름을 입력해주세요" />
<Image type="character" alt="숫자 2 풍선을 든 두 펭귄" />
<ResponseRowTrue name="김허들" meta="동반 1명" status="yes" />
<RSVPCard />
```

이벤트 콜백을 넘기는 화면은 Client Component로 작성합니다.
`Stepper`는 `value/onValueChange`로 제어하거나 `defaultValue`로 독립적으로 쓸 수 있습니다.
`CopyLinkField`는 전달받은 `url`을 복사하며 실패 시 재시도 안내를 표시합니다.
`RSVPCard`는 `onSubmit`에 실제 저장 함수를 연결해야 응답을 전송합니다.
콜백이 성공한 뒤에만 완료 상태로 바뀌며, 연결하지 않으면 실습용 안내를 표시합니다.
`state="done"`은 완료 화면 미리보기이며 실제 저장을 의미하지 않습니다.
DB·중복 응답·불참 시 동반 인원 정책은 이 컴포넌트 작업에서 확정하지 않았습니다.
