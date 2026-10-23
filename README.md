# 🎉 웹 초대장 제작 및 참석 응답(RSVP) 관리 토이 프로젝트

** Huddling Club 초보자-챌린지 학습내용입니다 **

Next.js와 Supabase를 활용해 모바일 웹 초대장을 만들고, 링크로 공유하며, 참석 여부를 수집하는 개인 학습 프로젝트입니다.

UI/UX 디자인부터 프론트엔드 구현, 인증과 데이터베이스 연동, 배포까지 웹 개발의 전반적인 과정을 직접 경험하기 위해 제작했습니다. 현재는 할로윈 테마인 `theme-copy`를 중심으로 기능과 디자인을 개선하고 있습니다.

> 학습 및 기능 검증을 위한 프로토타입으로, 실제 상용 서비스가 아닙니다.

## 🔗 Demo
할로윈 초대장 💌 (https://huddlingclub1008-pi.vercel.app/i/b34ba675-ec4c-4abd-be36-198265908b0d)

[Huddling Club 미리보기](https://huddlingclub1008-pi.vercel.app)

## ✨ 주요 기능

### 호스트 로그인 및 접근 권한

- Supabase Auth 기반 이메일·비밀번호 로그인 및 로그아웃
- 사전에 등록한 호스트 계정만 사용하며 공개 회원가입은 차단
- 로그인한 계정을 초대장 소유자(`host_id`)로 저장
- 초대장을 만든 호스트만 참석 응답 현황 조회
- 서버에서 사용자와 소유권을 확인하고, Supabase RLS로 DB 직접 조회도 제한

### 초대장 제작

- 제목, 일시, 장소, 초대 메시지 입력
- 입력 내용 실시간 미리보기
- 초대장 발행 및 공유 URL 생성·복사
- 내가 만든 초대장 목록에서 초대장과 응답 현황으로 이동

### 참석 응답(RSVP)

- 게스트는 로그인 없이 초대장 조회 및 참석·불참 응답 제출
- 본인을 제외한 동반 인원 입력
- 불참 선택 시 동반 인원 비활성화 및 0명으로 저장 (`theme-copy`)
- Supabase 데이터베이스에 응답 저장 및 제출 완료 안내

### 응답 현황 관리

- 참석·불참 응답 수와 응답자 목록 확인
- 동반 인원을 포함한 전체 참석 인원 집계
- 비로그인 사용자는 로그인 화면으로 이동하며, 다른 호스트의 응답 조회는 차단

### 인터랙티브 UI

- 모바일 중심의 반응형 레이아웃
- 블랙·퍼플·오렌지를 활용한 할로윈 테마
- 캐릭터 애니메이션, Border Beam, Confetti 효과
- 미리보기에서는 캐릭터를 작게 표시하고, 실제 초대장에서는 화면 폭에 맞춰 크기 조절
- 모션 감소 설정(`prefers-reduced-motion`) 대응

## 🛠 Tech Stack

| 구분 | 기술 |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Authentication | Supabase Auth |
| Database | Supabase (PostgreSQL), Row Level Security |
| Interaction | bot-avatars, canvas-confetti, CSS Animation |
| Deployment | Vercel |
| Version Control | Git / GitHub |

## 📁 프로젝트 구성

| 경로 | 설명 |
|---|---|
| `src/` | 기본 디자인의 초대장 앱 |
| `theme-copy/` | 할로윈 디자인과 인터랙션을 적용한 앱. 현재 주요 개선 대상 |
| `supabase/migrations/` | 호스트 소유권 컬럼과 RLS 정책 설정 SQL |
| `docs/auth-testing.md` | 로그인·권한 검증 및 제출 캡처 안내 |
| `tests/` | 기본 앱 입력 검증 테스트 |
| `scripts/smoke-supabase.mjs` | 로그인·응답 저장·접근 권한 통합 검증 스크립트 |

두 앱은 같은 Supabase 프로젝트와 계정을 사용합니다. 계정 생성, 가입 차단, DB 정책 설정은 앱마다 반복할 필요가 없습니다.

## 🚀 로컬 실행

Node.js 20.9 이상이 필요합니다.

### 환경변수

**저장소 루트**에 `.env.local`을 만들고 다음 값을 설정합니다. `.env.example`을 참고하세요.

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

`theme-copy`도 루트의 `.env.local`을 읽으므로 환경변수 파일을 별도로 복사하지 않아도 됩니다. 환경변수를 바꾸면 실행 중인 앱의 개발 서버를 재시작하세요.

`.env.local`과 계정 비밀번호는 GitHub에 업로드하지 않습니다. 이 앱은 서비스 역할 키나 Secret key를 사용하지 않습니다.

### 할로윈 테마

저장소 루트에서 실행합니다.

```sh
cd theme-copy
npm install
npm run dev
```

로그인 페이지: http://localhost:3001/login

### 기본 프로젝트

저장소 루트에서 실행합니다.

```sh
npm install
npm run dev
```

로그인 페이지: http://localhost:3000/login

## 🔐 Supabase 설정

1. `invitations`와 `rsvps` 테이블을 준비합니다.
   - `invitations`: `id`, `title`, `date`, `location`, `body`
   - `rsvps`: `id`, `invitation_id`, `name`, `status`, `companions`
   - 두 테이블의 `id`는 `gen_random_uuid()`를 기본값으로 갖는 UUID이며, `invitation_id`는 초대장 외래키입니다.
   - `date`는 일시를 입력하는 문자열, `status`는 `yes` 또는 `no`, `companions`는 0 이상의 정수입니다.
2. SQL Editor에서 [호스트 인증·권한 설정 SQL](supabase/migrations/202610230001_host_auth.sql)을 실행합니다.
3. Authentication → Users에서 사용할 호스트 계정을 직접 생성하고 이메일 인증 상태를 확인합니다.
4. Sign In / Providers에서 Email 로그인을 활성화하고 **Allow new users to sign up**을 끕니다.
5. 사이트의 `/login`에서 등록한 계정으로 로그인합니다.

SQL은 기존 테이블에 `host_id`를 추가하고 접근 정책을 교체합니다. 초대장은 공개 조회, 응답은 공개 제출이 가능하며 응답 조회는 해당 호스트에게만 허용합니다. 앱에서 수정·삭제 기능은 제공하지 않습니다.

로그인 기능 도입 전에 만든 초대장은 소유자가 지정되지 않아 응답 조회가 차단됩니다. 로그인 후 새로 만든 초대장으로 테스트하세요.

## 🧭 주요 페이지

| 경로 | 기능 | 접근 |
|---|---|---|
| `/login` | 호스트 로그인 | 공개 |
| `/create` | 초대장 제작 및 발행 | 로그인 필요 |
| `/host` | 내가 만든 초대장 목록 | 로그인 필요 |
| `/i/[id]` | 초대장 조회 및 참석 응답 | 로그인 불필요 |
| `/i/[id]/responses` | 참석 응답 현황 | 초대장을 만든 호스트만 |

## ✅ 검증

각 앱 폴더에서 실행합니다.

```sh
npm run lint
npm run typecheck
npm run build
```

기본 앱 입력 검증 테스트는 저장소 루트에서 실행합니다.

```sh
node --test tests/validation.test.mjs
```

실제 Supabase를 사용하는 통합 검증에는 별도 테스트 계정 설정이 필요합니다. 실행 방법과 동작 영상·캡처 순서는 [로그인 및 권한 검증 안내](docs/auth-testing.md)를 참고하세요. 할로윈 앱을 검증할 때는 `SMOKE_BASE_URL`의 포트를 `3001`로 설정합니다. 통합 검증은 확인용 초대장과 응답 데이터를 생성합니다.

## 📝 향후 학습 및 개선 계획

- [ ] 초대장 수정·삭제 등 관리 기능 확장
- [ ] 반응형 UI와 접근성 개선
- [ ] 인증 만료·오류 상황과 접근 권한 테스트 보강
- [ ] 배포 환경에서의 기능 검증 및 사용성 개선

## 📌 프로젝트 안내

이 저장소는 UI/UX 및 웹 개발 학습을 목적으로 운영합니다. 기능 구현과 디자인 실험을 병행하며, 호스트 인증과 RLS 정책을 적용해 참석 응답 조회를 제한하고 있습니다.

프로토타입의 기능 검증에는 테스트용 이름과 데이터를 사용해 주세요.
