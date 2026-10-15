# 프로젝트 전용 에이전트

이 폴더는 Codex 에이전트 설정의 원본입니다. 자동 등록 위치는 프로젝트의
`.codex/agents/`입니다. 현재 작업 환경은 `.codex` 쓰기를 허용하지 않아
자동 등록은 수행하지 못했습니다.

프로젝트 루트의 로컬 터미널에서 아래 명령으로 설치할 수 있습니다.
`cp -n`은 기존 파일을 덮어쓰지 않습니다. 이미 설치한 설정을 갱신할 때는
두 파일의 차이를 확인하고 반영하세요.

```sh
mkdir -p .codex/agents
cp -n agents/ui-reviewer.toml .codex/agents/ui-reviewer.toml
cp -n agents/figma-implementer.toml .codex/agents/figma-implementer.toml
cp -n agents/token-checker.toml .codex/agents/token-checker.toml
```

- `ui-reviewer`: 수정 없이 토큰, Figma 간격·정렬, 375px 모바일 문제를 보고합니다.
- `figma-implementer`: 부모 모델을 상속하여 Figma 분석부터 구현·검증까지 수행합니다.
- `token-checker`: 부모 모델을 상속하여 Figma와 코드 토큰을 비교하고, 승인된 경우에만 코드 토큰을 수정합니다. 현재는 `globals.css`를 기준으로 하며 Style Dictionary 도입 시 실제 원본과 생성 관계를 확인합니다.

사용 예시:

```text
figma-implementer 서브에이전트에 이 Figma 프레임의 구현을 위임해줘: [프레임 URL]
구현할 경로: /create
```

```text
ui-reviewer 서브에이전트로 /create 화면을 리뷰해줘.
Figma 프레임: [프레임 URL]
실행 화면: [로컬 URL]
수정하지 말고 문제와 위치만 알려줘.
```

설정 파일의 description은 역할 선택을 돕는 설명이며, URL 입력만으로
항상 자동 실행되는 훅은 아닙니다. 위 예시처럼 위임을 명시할 수 있습니다.
연결된 Figma MCP와 브라우저 도구가 필요하며, 사용할 수 없으면 에이전트가
필요한 입력과 검증하지 못한 범위를 알리도록 구성했습니다.

설정 형식: [공식 Codex 서브에이전트 문서](https://learn.chatgpt.com/docs/agent-configuration/subagents).

토큰 비교 예시:

```text
token-checker 서브에이전트로 이 Figma 프레임과 코드 토큰을 비교해줘: [Figma URL]
우선 보고만 하고 파일은 수정하지 마.
```

보고된 변경안을 승인하거나 처음부터 코드 자동 수정을 명시하면 적용 단계까지
진행할 수 있습니다. 조회 범위, 모드, 매핑 등 불명확한 내용은 먼저 질문합니다.
