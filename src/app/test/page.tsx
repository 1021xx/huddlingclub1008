import type { Metadata } from "next";
import Button from "@/components/Button";
import ComponentExamples from "./ComponentExamples";
export const metadata: Metadata = {
    title: "컴포넌트 테스트 | Huddling Club",
    robots: { index: false, follow: false },
};
const sizes = ["sm", "md", "lg"] as const;
const states = [
    { value: "default", label: "기본" },
    { value: "hover", label: "마우스를 올렸을 때" },
    { value: "disabled", label: "비활성" },
] as const;
export default function TestPage() {
    return (<main className="min-h-screen space-y-section bg-background-subtle px-page-horizontal py-section">
      <header className="space-y-inline-md">
        <h1 className="text-display-lg">컴포넌트 테스트</h1>
        <p className="text-body-md text-text-secondary">
          크기 3종 × 상태 3종, 총 9가지 버튼입니다. 기본 버튼에 마우스를
          올리거나 Tab 키로 이동해 보세요.
        </p>
      </header>

      {sizes.map((size) => (<section key={size} aria-labelledby={`button-${size}`} className="space-y-stack-md rounded-card bg-surface-default p-page-horizontal">
          <h2 id={`button-${size}`} className="text-heading-md">
            {size.toUpperCase()}
          </h2>
          <div className="flex flex-wrap items-start gap-stack-lg">
            {states.map(({ value, label }) => (<div key={value} className="space-y-stack-sm">
                <p className="text-caption-md text-text-secondary">
                  {label} ({value})
                </p>
                <Button size={size} state={value} aria-label={`${size} ${label} 버튼`}>
                  Button
                </Button>
              </div>))}
          </div>
        </section>))}
      <ComponentExamples />
    </main>);
}
