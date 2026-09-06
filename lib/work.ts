export type WorkStatus = "public" | "professional-abstract" | "method";

export type WorkSection = {
  heading: string;
  body: string[];
};

export type WorkItem = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  problemOneLiner: string;
  status: WorkStatus;
  confidentialityNote?: string;
  tags: string[];
  diagram?: "integrations" | "memory" | "harness" | "ci";
  sections: WorkSection[];
  outcome: string;
  todos?: string[];
};

export const work: WorkItem[] = [
  {
    slug: "production-ai-crm",
    title: "Production AI at the CRM boundary",
    kicker: "Case study A",
    summary:
      "How to treat CRM state, meetings, and messaging as evidence — then generate sales intelligence without turning the model into a source of truth.",
    problemOneLiner:
      "AI features fail in production when context arrives late, duplicated, or incomplete — and the model still answers with confidence.",
    status: "professional-abstract",
    confidentialityNote:
      "Described at a professional abstraction level. No employer internals, customer identifiers, metrics, or proprietary logic.",
    tags: ["CRM", "webhooks", "background processing", "AI context", "Slack"],
    diagram: "integrations",
    sections: [
      {
        heading: "Context",
        body: [
          "Revenue teams run on CRM objects, meeting artifacts, and chat. An AI product in that environment has to assemble a trustworthy picture of what happened, then produce output a salesperson can act on.",
          "The engineering surface is not “call a model.” It is ingestion, identity, synchronization, background work, and safe writes back into operational systems.",
        ],
      },
      {
        heading: "Problem",
        body: [
          "CRM APIs, meeting providers, and Slack (or similar) do not share a clock, an identity model, or a delivery guarantee. Events arrive out of order. Webhooks retry. Objects are partially updated. The same meeting can appear as several records.",
          "If generation runs against whatever is in the database at that moment, the system produces fluent intelligence that is locally plausible and globally wrong. Those failures are hard to reproduce because the missing piece is often an event that never arrived, arrived twice, or arrived under a different ID.",
        ],
      },
      {
        heading: "Constraints",
        body: [
          "Customer and employer data cannot leak into logs, prompts, or eval sets without controls.",
          "CRM writes must be conservative: duplicates and retries should not create junk records.",
          "Latency budgets differ by workflow. A Slack reply and a CRM backfill are not the same job.",
          "The implementation has to be debuggable by a human at 2 a.m., not only by the person who wrote the prompt.",
        ],
      },
      {
        heading: "Architecture",
        body: [
          "External systems emit events. An ingestion layer accepts webhooks and API fetches, persists the raw payload, and enqueues work. Processing resolves identity, updates internal state, and only then assembles context for a model. Downstream actions (Slack messages, CRM notes, tasks) are explicit jobs with their own retry policy.",
          "The important boundary: persistence of evidence happens before interpretation. AI is a consumer of assembled context, not the system of record.",
        ],
      },
      {
        heading: "Engineering decisions",
        body: [
          "Persist raw events before transforming them. If interpretation is wrong, you can replay. If you only store the model’s output, you cannot.",
          "Make processing idempotent on a stable event key. Retries are normal; double writes are the bug.",
          "Separate collection from generation. Mixing “fetch the deal” and “write the coaching note” in one request makes failure modes illegible.",
          "Treat prompt and retrieval configuration as versioned artifacts. When output quality changes, you need to know whether the model, the context, or the data contract moved.",
        ],
      },
      {
        heading: "Tradeoffs",
        body: [
          "Synchronous generation is easier to demo and easier to reason about in a single request. It collapses under webhook bursts, slow CRM reads, and model latency.",
          "Queued workers add operational surface (visibility, poison messages, retry storms) but they are how you survive partial failure.",
          "Fetching CRM state on demand is fresher; caching it is faster and cheaper. The choice depends on whether stale context is a correctness bug or a UX delay. For qualification and coaching, stale context is usually a correctness bug.",
        ],
      },
      {
        heading: "Failure modes",
        body: [
          "Duplicate webhooks creating duplicate downstream actions.",
          "Identity mismatch: the same person or meeting represented under different IDs across systems.",
          "Auth expiry on a long-running sync.",
          "Retrieval that omits the one field that would have contradicted the model’s summary.",
          "A deployment that changes chunking, filters, or tool schemas without a regression harness.",
        ],
      },
      {
        heading: "Validation",
        body: [
          "Replay captured (redacted) event sequences through the worker and assert idempotency.",
          "Compare generated artifacts against source evidence: every material claim should point at a record the system actually stored.",
          "Watch retry metrics and dead-letter queues as first-class signals, not afterthoughts.",
        ],
      },
      {
        heading: "Lessons",
        body: [
          "In production AI, context assembly is the product. The model is a component.",
          "Most “the AI is inconsistent” reports are integration, timing, or retrieval problems wearing a language-model costume.",
        ],
      },
    ],
    outcome:
      "TODO: add only factual, non-confidential outcomes you are willing to publish (scope of systems touched, kinds of workflows shipped). No metrics unless you provide them.",
    todos: [
      "Optional: public-safe description of Curvo AI product surface, if you want the company named in this case study.",
      "Optional: which CRM/meeting providers you are willing to name from public product facts only.",
    ],
  },
  {
    slug: "industrial-agent-memory",
    title: "Industrial agent memory as infrastructure",
    kicker: "Case study B",
    summary:
      "Persistent memory for industrial agents: operational history, failures, interventions, retrieval, and evidence provenance — treated as a storage and evaluation problem, not a prompt trick.",
    problemOneLiner:
      "An industrial agent that cannot remember what failed, what was tried, and why a decision was made will repeat expensive mistakes.",
    status: "public",
    tags: ["agent memory", "retrieval", "provenance", "evaluation", "persistence"],
    diagram: "memory",
    sections: [
      {
        heading: "Context",
        body: [
          "Industrial and operational agents do not live in a chat window. They sit next to assets, alarms, maintenance records, and human interventions. The useful question is not “can the model answer?” It is “can the system remember the operational history that makes an answer responsible?”",
          "This write-up is a public technical treatment of that problem: memory architecture, retrieval, provenance, and evaluation. It is not a dump of a private deployment.",
        ],
      },
      {
        heading: "Problem",
        body: [
          "Chat history is not memory. Logs are not memory. A vector store of undifferentiated chunks is usually not memory either.",
          "What the agent needs is a structured record of: what the asset was, what happened, what failed, what a human did, what the agent decided, and which evidence supported that decision. Those records have different lifetimes, different access patterns, and different costs of being wrong.",
        ],
      },
      {
        heading: "Constraints",
        body: [
          "Provenance is non-negotiable. A retrieved “fact” without a source is a liability in an operational setting.",
          "Memory writes must survive process restarts and be inspectable by humans.",
          "Retrieval must degrade gracefully: missing memory should be visible, not silently filled by the model.",
          "Evaluation has to include retrieval correctness, not only final-answer fluency.",
        ],
      },
      {
        heading: "Architecture",
        body: [
          "Asset and operational data produce events. Events are written into a memory layer that distinguishes operational history, failure records, and intervention records. Retrieval is a query against that layer with explicit filters (asset, time, failure class), not a single similarity search over a blob of text. Reasoning consumes retrieved items plus their provenance. Decisions are written back as new memory.",
        ],
      },
      {
        heading: "Engineering decisions",
        body: [
          "Separate event log from derived memory. The log is append-only evidence. Memory is a queryable projection.",
          "Store provenance with every memory item: source system, timestamp, record id, and the transform that produced it.",
          "Prefer typed memory objects (failure, intervention, observation, decision) over a single embedding namespace.",
          "Make “I don’t know / I don’t have the record” a first-class agent result.",
        ],
      },
      {
        heading: "Tradeoffs",
        body: [
          "A single vector index is fast to stand up and weak at time, identity, and negation (“this repair was already tried”).",
          "A relational or document store with optional embeddings is more operationally honest: you can ask precise questions, then rank.",
          "Summarization compresses context and destroys the ability to audit. Use summaries as indexes, not as the only copy of the truth.",
        ],
      },
      {
        heading: "Failure modes",
        body: [
          "Silent overwrite of a failure record by a later summary.",
          "Retrieval that returns similar-but-wrong assets.",
          "Clock and timezone errors in maintenance history.",
          "Feedback loops where the agent’s own decisions pollute future retrieval without being labeled as such.",
        ],
      },
      {
        heading: "Validation",
        body: [
          "Golden queries: given a known operational history, retrieval must surface the relevant failure and intervention, with provenance intact.",
          "Negative tests: the agent must refuse to invent a maintenance event that is not in memory.",
          "Replay: the same event log should rebuild the same memory projection.",
        ],
      },
      {
        heading: "Lessons",
        body: [
          "Agent memory is an infrastructure problem: schemas, durability, retrieval contracts, and evaluation.",
          "If you cannot point to the evidence, you do not have a memory system. You have a prompt with souvenirs.",
        ],
      },
    ],
    outcome:
      "Public architecture and evaluation approach. TODO: link a public repository or write-up if/when you want this tied to a specific codebase.",
    todos: [
      "Add a public GitHub URL if this maps to a real public repo.",
      "Add diagrams or eval notes from that repo once it is public.",
    ],
  },
  {
    slug: "harness-engineering",
    title: "Reproducible debugging and harness engineering",
    kicker: "Case study C",
    summary:
      "The first occurrence of a difficult failure requires investigation. The second occurrence should be cheap — for humans and for coding agents.",
    problemOneLiner:
      "Irreproducible production failures are expensive twice: once to understand, and again every time an agent or teammate re-derives the same diagnosis.",
    status: "method",
    tags: ["debugging", "reproduction", "harnesses", "agents", "regression"],
    diagram: "harness",
    sections: [
      {
        heading: "Context",
        body: [
          "Difficult production issues — flaky AI features, unreliable webhooks, race conditions, retry storms — share a property: the expensive part is getting the failure to stand still.",
          "This is a method I use, and a design I want more teams to treat as infrastructure. It is also the interface that makes AI-assisted engineering useful instead of theatrical.",
        ],
      },
      {
        heading: "Problem",
        body: [
          "The first occurrence of a failure requires investigation: logs, hypotheses, bisects, local reproduction. That work is inherently expensive.",
          "Teams often stop there. The next similar failure starts from zero. Coding agents then wander through the same log volume, invent the same wrong hypotheses, and open the same incomplete patches.",
          "The missing artifact is a harness: a deterministic way to replay the failure, assert the broken behavior, and keep that knowledge after the patch lands.",
        ],
      },
      {
        heading: "Constraints",
        body: [
          "Production data may be sensitive. Captures have to be redacted or synthesized.",
          "The harness must run in CI, not only on one engineer’s laptop.",
          "It has to be cheap enough that people actually write the second test.",
          "Agents should be able to execute the harness without a guided tour of tribal knowledge.",
        ],
      },
      {
        heading: "Architecture",
        body: [
          "Production failure → capture (inputs, clocks, message order, model/tool traces as appropriate) → reproduction harness → investigation (human or agent) → patch → tests that encode the failure → regression knowledge that remains in the repo.",
        ],
      },
      {
        heading: "Engineering decisions",
        body: [
          "Capture at the boundary where non-determinism enters: time, network, queues, model responses, RNG. Replay inside that boundary.",
          "Prefer a failing test over a narrative bug ticket. Tickets rot. Tests remain executable.",
          "Give agents the harness as the primary workspace. An agent that can run `repro` and `test` is more valuable than an agent that can only read Slack.",
          "Store diagnosis notes next to the harness: what was ruled out, not only what was true. Negative knowledge is part of the regression suite.",
        ],
      },
      {
        heading: "Tradeoffs",
        body: [
          "Full production replay is the most faithful and the most expensive to sanitize.",
          "A minimized fixture is easier to keep, but you can minimize away the bug. Minimize after the failure is red, not before.",
          "Recorded model outputs make AI-feature bugs deterministic; they also freeze a particular model version. Version the recordings.",
        ],
      },
      {
        heading: "Failure modes",
        body: [
          "Harnesses that only pass on one machine because of implicit timezones or filesystem layout.",
          "Captures that contain secrets.",
          "Tests that assert implementation details and break on every valid refactor.",
          "Agent loops that patch the harness until it is green without fixing production.",
        ],
      },
      {
        heading: "Validation",
        body: [
          "The captured failure is red before the patch and green after — on CI.",
          "A close cousin of the failure (off-by-one, duplicate event, delayed webhook) is also encoded, or explicitly listed as unhandled.",
          "The harness does not require production credentials.",
        ],
      },
      {
        heading: "Lessons",
        body: [
          "AI agents do not remove systems engineering. They amplify whatever feedback loop you give them.",
          "A reproducible failure is dramatically easier for humans and agents to diagnose. Make that the default, not a luxury.",
        ],
      },
    ],
    outcome:
      "Method and architecture for turning once-expensive failures into cheap, executable knowledge. TODO: attach a public harness example when you have a repo you want featured.",
  },
  {
    slug: "ci-distributed-infrastructure",
    title: "CI workers, queues, and distributed execution",
    kicker: "Case study D",
    summary:
      "Systems knowledge from building and operating CI-related infrastructure: queues, workers, event delivery, retries, and runner lifecycle — without treating the platform as a demo.",
    problemOneLiner:
      "Distributed execution is easy to sketch and hard to operate: every retry, timeout, and lost event becomes someone else’s broken build.",
    status: "professional-abstract",
    confidentialityNote:
      "Based on founding-engineer work in CI and distributed infrastructure. No internal architecture, customer names, or unpublished performance claims.",
    tags: ["Go", "queues", "workers", "retries", "reliability"],
    diagram: "ci",
    sections: [
      {
        heading: "Context",
        body: [
          "Continuous integration looks like a button in GitHub. Underneath it is a distributed system: events from a forge, work queued for machines, runners with a lifecycle, logs that must be durable, and failures that must be classified (user test failed vs. infrastructure ate the job).",
          "Founding-engineer work at MonkCI sat in that problem space: making execution reliable enough that developers can ignore the machinery.",
        ],
      },
      {
        heading: "Problem",
        body: [
          "The difficult parts are not the happy path. They are: a worker that dies mid-job, a retry that double-starts a non-idempotent step, an event that arrives twice, a runner that is busy but not healthy, a timeout that is indistinguishable from a hung test.",
          "CI multiplies these issues across untrusted workloads, bursty queues, and a user population that correctly treats infrastructure flakes as the platform’s bug, not theirs.",
        ],
      },
      {
        heading: "Constraints",
        body: [
          "Jobs must be isolatable. One workload cannot poison the next.",
          "Event delivery from the forge is at-least-once until you prove otherwise.",
          "Users need a story for every terminal state: passed, failed, cancelled, timed out, infrastructure error.",
          "Observability has to explain a single job without requiring a distributed-tracing hobby project on day one — but you still need enough signal to debug races.",
        ],
      },
      {
        heading: "Architecture",
        body: [
          "Forge events enter an ingestion path, are persisted, and become queue work. Workers claim jobs, provision or assign a runner, stream logs, and report terminal state. Failures either retry with policy or dead-letter with a reason a human can read. Runner lifecycle (acquire, idle, recycle, drain) is explicit, not implied by “the process is still up.”",
        ],
      },
      {
        heading: "Engineering decisions",
        body: [
          "Persist the event before acting on it. Lost events are worse than delayed jobs.",
          "Distinguish application failure from infrastructure failure in the state machine. Mixing them trains users to re-run everything.",
          "Retries need a budget and a key. Infinite retry with a fresh runner can hide a poison payload.",
          "Go is a natural fit for this class of service: explicit concurrency, straightforward deployment, good fit for workers and proxies. That is a supporting fact, not the point of the work.",
        ],
      },
      {
        heading: "Tradeoffs",
        body: [
          "A fat worker that does scheduling, execution, and log shipping is simpler until you need to scale one axis independently.",
          "Aggressive timeouts keep queues moving and create false failures. Loose timeouts hide wedged runners. The policy has to be visible and tunable.",
          "At-least-once execution plus non-idempotent user scripts is an unsolved user-facing problem; the platform can only make retries obvious and rare.",
        ],
      },
      {
        heading: "Failure modes",
        body: [
          "Split brain: two workers claim the same job.",
          "Retry storms after a downstream outage.",
          "Log loss on worker crash, leaving a failed job with no evidence.",
          "Idle runners that look available and are not.",
        ],
      },
      {
        heading: "Validation",
        body: [
          "Fault injection on workers and queues: kill a worker mid-job and assert the job lands in a defined state.",
          "Idempotency tests on event ingestion.",
          "Classification tests: a failing user test is not reported as an infrastructure incident.",
        ],
      },
      {
        heading: "Lessons",
        body: [
          "Reliability is a state machine plus evidence. If you cannot explain why a job died, you do not operate a CI system — you operate a lottery.",
          "Queues and retries are not implementation details. They are the product’s behavior under stress.",
        ],
      },
    ],
    outcome:
      "TODO: add only public, non-confidential facts you want attached (tenure, problem classes you owned). Do not add speed, cost, or customer claims.",
    todos: [
      "Confirm which public MonkCI details you want named vs kept generic.",
    ],
  },
];

export function getWork(slug: string) {
  return work.find((item) => item.slug === slug);
}

export function getWorkSlugs() {
  return work.map((item) => item.slug);
}
