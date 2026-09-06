export const principles = [
  {
    title: "Production over demos",
    body: "A system is not useful because it works once in a notebook or a staging screenshot. It is useful when it survives retries, partial data, bad clocks, and the next deploy. Demo-quality AI is a starting point, not a finish line.",
  },
  {
    title: "Context is infrastructure",
    body: "AI systems depend on reliable context: what is stored, what is retrieved, what is excluded, and who is allowed to see it. Memory, boundaries, and retrieval contracts are infrastructure decisions. Treat them with the same seriousness as a database schema.",
  },
  {
    title: "Make failures reproducible",
    body: "The first occurrence of a difficult failure requires investigation. The second should be cheap. A captured, replayable failure is dramatically easier for humans and coding agents to diagnose than a pile of correlating logs.",
  },
  {
    title: "Prefer simple orchestration",
    body: "Do not add coordinators, multi-agent meshes, or extra queues unless they create leverage you can name. Extra coordination hides the data flow and multiplies failure modes. Earn complexity.",
  },
  {
    title: "Ship, observe, improve",
    body: "Production behavior is an important source of engineering knowledge. Instrumentation, traces, and user-visible error classes teach you what the design actually is — which is often not what the diagram said.",
  },
  {
    title: "Reliability compounds",
    body: "Tests, observability, deterministic reproduction, and documented failure modes are not ceremony. They make the next change cheaper. Teams that skip them pay the cost on every incident and every agent-generated patch.",
  },
] as const;
