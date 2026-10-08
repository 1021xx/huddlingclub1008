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

설정 참고: [Next.js](https://nextjs.org/docs/app/getting-started/installation),
[Tailwind CSS](https://tailwindcss.com/docs/installation/framework-guides/nextjs).
