import type { ReactNode } from "react";

type Step = {
  label: string;
  caption?: string;
};

const diagrams: Record<string, { title: string; steps: Step[] }> = {
  integrations: {
    title: "Integrations path",
    steps: [
      { label: "External systems", caption: "CRM, Slack, APIs" },
      { label: "Ingestion", caption: "Webhooks & fetches" },
      { label: "Processing", caption: "Identity, idempotency" },
      { label: "Persistence", caption: "Evidence before interpretation" },
      { label: "AI", caption: "Context in, claims out" },
      { label: "Downstream", caption: "Actions with retry policy" },
    ],
  },
  memory: {
    title: "Agent memory path",
    steps: [
      { label: "Asset data", caption: "State & telemetry" },
      { label: "Events", caption: "Append-only evidence" },
      { label: "Memory", caption: "Typed projections" },
      { label: "Retrieval", caption: "Query + provenance" },
      { label: "Reasoning", caption: "Bounded context" },
      { label: "Decision", caption: "Written back as memory" },
    ],
  },
  harness: {
    title: "Harness engineering",
    steps: [
      { label: "Failure", caption: "Production incident" },
      { label: "Capture", caption: "Inputs at the boundary" },
      { label: "Reproduce", caption: "Deterministic replay" },
      { label: "Diagnose", caption: "Human or agent" },
      { label: "Patch", caption: "Minimal change" },
      { label: "Regression", caption: "Knowledge stays in CI" },
    ],
  },
  ci: {
    title: "Distributed CI execution",
    steps: [
      { label: "Forge events", caption: "At-least-once delivery" },
      { label: "Persist", caption: "Event log first" },
      { label: "Queue", caption: "Claim with a key" },
      { label: "Worker", caption: "Bounded retries" },
      { label: "Runner", caption: "Explicit lifecycle" },
      { label: "Terminal state", caption: "Classified failure" },
    ],
  },
};

function Arrow() {
  return (
    <span className="flow-arrow" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M3 8h10M9 4l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="square"
        />
      </svg>
    </span>
  );
}

export function FlowDiagram({
  id,
  title,
  steps,
}: {
  id?: string;
  title?: string;
  steps?: Step[];
}) {
  const resolved = id ? diagrams[id] : undefined;
  const heading = title ?? resolved?.title;
  const items = steps ?? resolved?.steps ?? [];

  return (
    <figure className="flow-diagram">
      {heading ? <figcaption className="flow-diagram-title">{heading}</figcaption> : null}
      <ol className="flow-diagram-list">
        {items.map((step, index) => (
          <li key={step.label} className="flow-diagram-item">
            {index > 0 ? <Arrow /> : null}
            <div className="flow-node">
              <span className="flow-node-label">{step.label}</span>
              {step.caption ? (
                <span className="flow-node-caption">{step.caption}</span>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function Callout({ children }: { children: ReactNode }) {
  return <aside className="callout">{children}</aside>;
}
