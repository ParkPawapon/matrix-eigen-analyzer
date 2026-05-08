export const matrixInputSecurityBoundary = {
  feature: "matrix",
  acceptedSizes: [2, 3],
  validationOwner: "src/features/matrix/domain",
} as const;

// Future calculator work should validate and normalize raw matrix input before domain logic runs.
