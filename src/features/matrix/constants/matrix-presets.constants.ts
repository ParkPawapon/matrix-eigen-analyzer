import type { MatrixInput, MatrixSize } from "@/features/matrix/domain/matrix.types";

export type MatrixPreset = Readonly<{
  id: string;
  label: string;
  size: MatrixSize;
  matrix: MatrixInput;
}>;

export const matrixPresets = [
  {
    id: "two-distinct",
    label: "2x2 diagonalizable",
    size: 2,
    matrix: [
      [4, 1],
      [2, 3],
    ],
  },
  {
    id: "two-defective",
    label: "2x2 not diagonalizable",
    size: 2,
    matrix: [
      [2, 1],
      [0, 2],
    ],
  },
  {
    id: "three-distinct",
    label: "3x3 diagonalizable",
    size: 3,
    matrix: [
      [3, 1, 0],
      [0, 2, 0],
      [0, 0, 5],
    ],
  },
  {
    id: "three-defective",
    label: "3x3 not diagonalizable",
    size: 3,
    matrix: [
      [2, 1, 0],
      [0, 2, 1],
      [0, 0, 2],
    ],
  },
] as const satisfies readonly MatrixPreset[];
