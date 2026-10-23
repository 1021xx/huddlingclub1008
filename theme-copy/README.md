# Huddling Club

Next.js App Router, TypeScript 5, Tailwind CSS v4 기반 프로젝트입니다.

## 시작하기

Node.js 20.9 이상이 필요합니다.

```sh
npm install
npm run dev
```

브라우저에서 http://127.0.0.1:3001/login 을 엽니다. 최초 설치 시 생성되는
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

## 호스트 로그인

저장소 루트의 `.env.local`을 그대로 불러옵니다. Supabase 계정과 가입 차단,
`../supabase/migrations/202610230001_host_auth.sql`은 루트 앱과 공유하므로 재설정하지 않습니다.
Email 제공자는 활성화하고 신규 회원가입은 차단한 상태로 사용합니다.

- `/login`: 등록된 호스트 이메일·비밀번호로 로그인 (회원가입 없음)
- `/create`: 로그인한 사용자가 초대장을 생성하며 `host_id`를 저장
- `/host`: 내가 만든 초대장 목록
- `/i/[id]`: 로그인 없이 초대장 조회와 참석 응답 제출
- `/i/[id]/responses`: 초대장을 만든 계정만 응답 현황 조회

로그인 전에 만든 소유자 없는 초대장은 응답 조회가 차단됩니다. 로그인 후 새 초대장으로 테스트하세요.
제출 검증 순서는 `../docs/auth-testing.md`를 참고하고 주소의 포트만 3001로 사용하세요.

설정 참고: [Next.js](https://nextjs.org/docs/app/getting-started/installation),
[Tailwind CSS](https://tailwindcss.com/docs/installation/framework-guides/nextjs).
