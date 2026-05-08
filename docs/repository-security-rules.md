# Repository Security Rules

This repository is configured for a production-oriented review flow.

## Ownership

- `@ParkPawapon` owns all files through `.github/CODEOWNERS`.
- CODEOWNERS review is required before protected branch changes can merge.
- Ruleset bypass is reserved for `@ParkPawapon` only.

## Protected Branch Policy

The default branch must use pull requests for changes. Required controls:

- Pull request review before merge.
- CODEOWNERS review.
- Stale approvals dismissed after new commits.
- Latest push approval from a different reviewer when available.
- Review threads resolved before merge.
- Required quality gate workflow.
- Linear history.
- No force pushes.
- No branch deletion.

## Repository Rulesets

Active GitHub rulesets:

- `Production Enterprise Default Branch Protection`
  - Target: default branch.
  - Requires pull requests, CODEOWNERS review, stale approval dismissal, latest push approval, resolved review threads, the quality gate, linear history, no force pushes, and no branch deletion.
  - Bypass actor: `@ParkPawapon` only.
- `Production Enterprise Branch Hygiene`
  - Target: all branches.
  - Prevents non-fast-forward updates.
  - Bypass actor: `@ParkPawapon` only.
- `Production Enterprise Tag Protection`
  - Target: all tags.
  - Restricts tag creation, update, and deletion to bypass actors.
  - Bypass actor: `@ParkPawapon` only.

GitHub API rejected branch name pattern and max file size rules for this personal repository at setup time. Keep branch names in `dbhub/<short-purpose>` format unless GitHub ruleset support is expanded.

## Security Posture

- Secrets must never be committed.
- Dependency updates are opened by Dependabot.
- GitHub Actions use read-only repository permissions by default.
- Security-sensitive files under `.github/` remain owned by `@ParkPawapon`.

## Future Hardening

Enable GitHub Advanced Security features when available for this repository:

- Secret scanning push protection.
- Dependabot security updates.
- Code scanning with a blocking ruleset once alerts are available.
