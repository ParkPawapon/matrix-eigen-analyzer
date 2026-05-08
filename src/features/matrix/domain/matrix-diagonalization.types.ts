import type { MatrixInput } from "./matrix.types";

export type DiagonalizationStatus = "pending" | "diagonalizable" | "not-diagonalizable";

export type DiagonalizationResultContract = {
  status: DiagonalizationStatus;
  sourceMatrix: MatrixInput;
  reason?: string;
};
