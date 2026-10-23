# 호스트 로그인 검증과 제출

## 준비

1. `.env.example`을 참고해 `.env.local`에 Supabase URL과 publishable key를 설정합니다.
2. Supabase SQL Editor에서 `supabase/migrations/202610230001_host_auth.sql`을 실행합니다. 기존 공개 응답 정책을 제거하는 단계까지 반드시 적용해야 합니다.
3. Authentication → Users에서 본인 계정을 생성하고, Sign In / Providers에서 Email 로그인을 활성화한 채 `Allow new users to sign up`을 끕니다.
4. 개발 서버를 재시작합니다: `npm run dev -- --hostname 127.0.0.1`.
5. 본인 계정 A로 로그인합니다. 다른 호스트 차단까지 검증하려면 별도 테스트 환경에서만 사용자 B를 관리자 화면으로 생성합니다. 공개 회원가입을 다시 열 필요는 없습니다.

## 동작 영상 또는 캡처

1. A로 `/login`에 로그인하고 초대장을 만듭니다. 발행 완료 화면과 초대장 링크를 캡처합니다.
2. 시크릿 창에서 초대장 링크를 열고 로그인 없이 게스트 이름과 참석 여부를 제출합니다. 저장 완료 화면을 캡처합니다.
3. A의 창에서 응답 현황을 엽니다. 게스트 이름과 통계를 캡처합니다.
4. 시크릿 창에서 같은 응답 현황 URL을 엽니다. 로그인 화면으로 이동하는 모습을 캡처합니다.
5. B로 로그인해 같은 응답 현황 URL을 엽니다. 조회 불가 안내와 게스트 이름이 노출되지 않는 것을 캡처합니다.
6. A가 로그아웃한 뒤 응답 현황 URL을 다시 열어 로그인 화면으로 이동하는지 확인합니다.

캡처에는 비밀번호, 인증 링크, 세션 쿠키를 포함하지 마세요. 기존 소유자 없는 초대장 대신 로그인 후 새로 만든 초대장으로 검증합니다.

## 자동 통합 검증

이메일 인증을 마친 서로 다른 두 테스트 계정을 준비하고, 로컬 환경변수 또는 Git에서 제외된 `.env.local`에 설정합니다.

```dotenv
SMOKE_HOST_EMAIL=host-test@example.com
SMOKE_HOST_PASSWORD=YOUR_TEST_PASSWORD
SMOKE_OTHER_EMAIL=other-test@example.com
SMOKE_OTHER_PASSWORD=YOUR_OTHER_TEST_PASSWORD
SMOKE_BASE_URL=http://127.0.0.1:3000
```

서버 실행 후 `node scripts/smoke-supabase.mjs`를 실행합니다.
비로그인 생성 차단, 공개 응답 제출, 호스트 조회, 다른 사용자·비로그인 조회 차단,
Supabase REST 직접 접근의 RLS 차단을 검증합니다.
테스트 초대장 1개와 응답 2개가 남습니다. 계정은 자동 생성하지 않습니다.

환경변수·DB 정책이 없을 때는 로그인 화면과 로컬 코드 검증만 가능하며,
실제 인증 및 권한 검증이 통과했다고 제출할 수 없습니다.
