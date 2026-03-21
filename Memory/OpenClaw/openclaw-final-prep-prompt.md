# OpenClaw Final Prep Prompt

You are the OpenClaw agent operating inside the repo at `/Users/kirillrybkov/Desktop/synthesis_agent_hackathon`.

Your job is to do the final pre-deadline submission-prep pass for the Synthesis hackathon.

## Mission

Treat the project as already technically real and live, but needing a final polish + submission-hardening pass.

The most important goals are:

1. Verify the current project still honestly qualifies for the intended Synthesis tracks.
2. Check the latest Synthesis instructions and deadline language directly from the official sources if internet access is available.
3. Make the repo cleaner, tighter, and easier for judges to understand.
4. Update the top-level `README.md` so it clearly explains:
   - what the project is
   - which tracks it targets
   - why it fits those tracks
   - how the agent was actually used during development
5. Remove or archive unused, stale, duplicate, or misleading files, but do not delete any important live proof artifacts or historically useful evidence records.

## Current project truth you should preserve

This repo is a principal-protected `wstETH` treasury for AI agents.

Core behavior:
- a human funds the treasury
- principal stays protected
- only yield / spendable surplus is available for use
- spend power can be split into budgets and sub-budgets
- agent executors operate through constrained authority rather than raw treasury ownership
- MetaMask smart-account delegation is part of the real spend path
- each spend creates a verifiable onchain receipt tied to the exact rule that authorized it

Current live proof state:
- live Base mainnet proof exists
- live MetaMask + `wstETH` path exists
- judge-facing Next.js dashboard exists in `apps/web/`
- evidence and readiness artifacts already exist in `Memory/` and `artifacts/`

Do not rewrite the project as if it is still only a Sepolia prototype.

## Track-fit review instructions

Audit the repo against the actual current Synthesis tracks and instructions.

Focus especially on these tracks:
- Best Use of Delegations
- stETH Agent Treasury
- Agents With Receipts — ERC-8004
- Let the Agent Cook
- Synthesis Open Track

If there are any other tracks that the project now honestly qualifies for, identify them, but do not exaggerate.

For each target track:
- decide whether the project is honestly competitive
- explain the concrete evidence in the repo
- call out any remaining weak spots in presentation or framing
- improve docs/copy so the fit is clearer

If internet access is available:
- read the official Synthesis instructions again
- verify the current deadline language and any requirements that matter for submission quality
- prefer official sources

## README update requirements

Update `README.md` so it contains a clear section describing how the agent was actually used.

The README should explain this honestly and explicitly:

- the agent helped brainstorm the project direction by analyzing the current competition and looking for a strong reward-to-competition opportunity across tracks
- the agent then helped set up and implement the project end-to-end with human guidance
- there was a heartbeat / ongoing automation loop that kept OpenClaw integrating the project
- that loop got stuck / circled on some issues
- human involvement was needed to unblock, finish the final touches, and ship a polished final state

This section should sound strong and real, not defensive, and not fake-autonomous.

Also make sure the README explains:
- what the treasury does
- how budgets / sub-budgets work
- how agents actually get controlled access to funds
- how MetaMask delegation and receipts fit in
- where to find the judge-facing dashboard
- where to find the live Base mainnet proof

## Cleanup instructions

Clean up unused or stale files, but be careful.

Safe cleanup targets:
- obviously obsolete duplicate docs
- stale generated files that contradict the current live mainnet state
- dead prototype leftovers that are no longer referenced
- old frontend clutter that is superseded by `apps/web/`

Do not remove:
- live proof artifacts
- deployment notes
- archived historical evidence that helps explain evolution
- anything required by the final dashboard, submission artifacts, or current scripts

If something is historically useful but not part of the final story, prefer moving it into a clearly named archive area rather than deleting it.

## Working style

- Be skeptical of stale copy.
- Prefer updating the source generator over hand-editing generated output where possible.
- Do not fabricate track fit.
- Do not claim a feature is live unless the repo evidence supports it.
- Preserve the strongest honest Base mainnet story.
- Keep the repo judges-first: clear, credible, easy to scan.

## Deliverables

Before you finish, make sure you:

1. update `README.md`
2. clean obvious stale/unused files safely
3. improve track-fit wording where needed
4. summarize what changed
5. list any remaining non-code submission tasks for the human:
   - final project name
   - video
   - cover/media
   - any remaining public metadata polish

## Suggested final output format

At the end of your run, report:

- whether the project looks submission-ready
- which tracks are strongest
- what you changed
- what still needs human action before final submission
