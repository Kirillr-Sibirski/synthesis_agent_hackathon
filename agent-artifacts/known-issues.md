# Known Issues and Incomplete Items

## Submission-side items still requiring a human
- final track selection in the submission UI
- final video URL
- cover image / screenshots / logo
- final project UUID / public media linkage polish
- self-custody transfer in Synthesis if still pending
- final publish action

## Honest technical caveats
- Base mainnet `wstETH` uses an L2 fallback accounting mode because the bridged token does not expose canonical L1 conversion helpers.
- The kept skill is intentionally lightweight; it demonstrates agent usage and wallet creation, not a fully autonomous production policy engine.
- Some preserved historical docs under `agent-artifacts/` still reference the pre-cleanup repo layout. The new top-level `agent-artifacts/*.md` files are the canonical navigation layer.

## Cleanup caveat
This cleanup was done under deadline pressure after the implementation was already complete. The goal was to make the repo judge-friendly without changing the core sponsor-complete implementation.