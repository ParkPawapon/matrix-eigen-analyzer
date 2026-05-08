# Security Policy

## Supported Branch

Security fixes are accepted through pull requests targeting `main`.

## Reporting A Vulnerability

Report vulnerabilities privately to the repository owner, `@ParkPawapon`. Do not disclose exploitable details in public issues or pull requests.

## Handling Rules

- Do not commit secrets, credentials, tokens, private keys, or production `.env` files.
- Keep `.env.example` limited to safe placeholders.
- Validate and normalize future matrix input before any domain calculation executes.
- Avoid unsafe HTML rendering and unreviewed third-party scripts.
- Require CODEOWNERS review for protected branches.
