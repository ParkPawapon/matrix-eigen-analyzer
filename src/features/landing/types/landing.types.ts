export type LandingSectionId =
  | "hero"
  | "assignment-overview"
  | "features"
  | "technical-stack"
  | "cta";

export type LandingSectionSummary = {
  id: LandingSectionId;
  label: string;
};
