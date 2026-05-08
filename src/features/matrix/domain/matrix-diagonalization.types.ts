import type {
  ComplexMatrix,
  ComplexNumber,
  ComplexVector,
  MatrixInput,
  MatrixSize,
} from "./matrix.types";

export type DiagonalizationStatus = "diagonalizable" | "not-diagonalizable";
export type DiagonalizationField = "real" | "complex";

export type CharacteristicPolynomial = Readonly<{
  coefficients: readonly number[];
  expression: string;
}>;

export type EigenpairResult = Readonly<{
  eigenvalue: ComplexNumber;
  algebraicMultiplicity: number;
  geometricMultiplicity: number;
  eigenvectors: readonly ComplexVector[];
}>;

export type DiagonalizationMatrices = Readonly<{
  p: ComplexMatrix;
  pInverse: ComplexMatrix;
  d: ComplexMatrix;
}>;

export type DiagonalizationResultContract = {
  status: DiagonalizationStatus;
  sourceMatrix: MatrixInput;
  size: MatrixSize;
  field: DiagonalizationField;
  characteristicPolynomial: CharacteristicPolynomial;
  eigenpairs: readonly EigenpairResult[];
  matrices?: DiagonalizationMatrices;
  reason: string;
  warnings: readonly string[];
};
