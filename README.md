# Huddling Club

Next.js App Router, TypeScript 5, Tailwind CSS v4 기반 프로젝트입니다.

## 시작하기

Node.js 20.9 이상이 필요합니다.

```sh
npm install
npm run dev
```

브라우저에서 http://localhost:3000 을 엽니다. 최초 설치 시 생성되는
`package-lock.json`을 버전 관리에 포함하세요.

## 명령어

```sh
npm run lint       # ESLint
npm run typecheck  # Next.js 타입 생성 및 TypeScript 검사
npm run build      # 프로덕션 빌드
npm start          # 빌드된 앱 실행
```

## 주요 파일

- `src/app/page.tsx`: 홈 페이지
- `src/app/layout.tsx`: 루트 레이아웃과 메타데이터
- `src/app/globals.css`: Tailwind CSS 가져오기와 전역 스타일
- `postcss.config.mjs`: Tailwind CSS v4 PostCSS 플러그인
- `tsconfig.json`: strict 모드와 `@/*` → `src/*` 경로 별칭

Tailwind CSS v4 설정은 CSS의 `@theme`을 사용합니다.

## Supabase 연결

저장소 루트의 `.env.local`에 다음 두 환경변수를 설정합니다.
실제 키를 커밋하지 마세요. `.env.local`은 Git에서 제외됩니다.

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

루트 앱과 `theme-copy` 할로윈 앱 모두 이 설정을 사용합니다.
환경변수를 변경한 뒤 서버를 재시작하세요.
할로윈 앱은 `theme-copy`에서 `npm run dev`로 실행하며 포트는 3001입니다.

DB에는 `invitations(id, title, date, location, body)`와
`rsvps(id, invitation_id, name, status, companions)` 테이블이 필요합니다.
`id`는 기본값이 `gen_random_uuid()`인 UUID이고, `invitation_id`는 초대장의 외래키입니다.
`date`는 자유 형식의 일시 문자열, `status`는 `yes` 또는 `no`,
`companions`는 0 이상의 정수입니다.
두 테이블 모두 RLS를 켜고 `anon` 역할에 SELECT·INSERT 권한과 정책을 설정합니다.
공개 읽기 정책이므로 응답자의 이름과 참석 여부도 누구나 조회할 수 있습니다.
UPDATE·DELETE 권한은 필요하지 않습니다.

`/create`에서 발행한 뒤 생성된 `/i/[UUID]` 링크로 참석 응답을 보낼 수 있습니다.
`/i/[UUID]/responses`는 저장된 응답을 표시합니다.
기존 `/i/demo`·`/i/empty` 링크는 사용하지 않습니다.
서버의 `src/lib/supabase.ts`가 Supabase REST API를 호출하며,
publishable key를 사용하므로 RLS를 우회하지 않습니다.

입력 검증 테스트: `node --test tests/validation.test.mjs`
실제 저장 확인: 서버 실행 후 `node scripts/smoke-supabase.mjs`
(확인용 초대장 1개와 응답 2개가 DB에 남습니다.)

설정 참고: [Next.js](https://nextjs.org/docs/app/getting-started/installation),
[Tailwind CSS](https://tailwindcss.com/docs/installation/framework-guides/nextjs).
