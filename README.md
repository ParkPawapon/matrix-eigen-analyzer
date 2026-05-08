# EigenScope

Landing page foundation for EigenScope, a future matrix eigenvalue, eigenvector, and diagonalization analysis system.

## Tech Stack

- Bun
- Next.js App Router
- TypeScript
- Tailwind CSS
- MUI Material UI
- Framer Motion
- ESLint
- Prettier

## Commands

```bash
bun install
bun dev
bun build
bun start
bun lint
bun typecheck
bun format
```

## Architecture

```text
src/
  app/                  App Router entrypoints and route-level states
  assets/               Static icons, images, and local font assets
  core/                 Application-wide design system, theme, providers, SEO, accessibility, and security boundaries
  features/
    landing/            Landing page sections, content contracts, and feature-specific utilities
    matrix/             Future matrix calculator boundary and mathematical domain types
  shared/               Reusable UI, layout, motion, typography, constants, hooks, types, and utilities
  tests/                Unit, integration, and e2e test roots
```

## Design Direction

The design system follows the VoiceBox reference: high-contrast editorial layout, black and white foundation, sparse red accent, massive typography, square edges, 2px borders, no shadows, and no gradients. The scaffold centralizes these decisions in `src/core/design-system` and mirrors them into Tailwind and MUI theme configuration.

## Future Matrix Work

The matrix calculator is intentionally not implemented yet. Future work should live behind `src/features/matrix`, with mathematical rules in `src/features/matrix/domain` and input handling separated from rendering. Matrix input validation and sanitization should be added before any calculation logic accepts user-provided values.

## Security And Accessibility

The project uses strict TypeScript, a minimal `.env.example`, a dedicated security boundary folder, visible focus states, semantic landmarks, and a skip link prepared in the root layout. Avoid `dangerouslySetInnerHTML` and keep raw matrix input validation at the feature boundary.
