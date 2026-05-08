export type MatrixSize = 2 | 3;
export type MatrixScalar = number;

export type ComplexNumber = Readonly<{
  real: number;
  imaginary: number;
}>;

export type ComplexVector = readonly ComplexNumber[];
export type ComplexMatrix = readonly ComplexNumber[][];

export type Matrix2x2 = readonly [
  readonly [MatrixScalar, MatrixScalar],
  readonly [MatrixScalar, MatrixScalar],
];

export type Matrix3x3 = readonly [
  readonly [MatrixScalar, MatrixScalar, MatrixScalar],
  readonly [MatrixScalar, MatrixScalar, MatrixScalar],
  readonly [MatrixScalar, MatrixScalar, MatrixScalar],
];

export type MatrixInput = Matrix2x2 | Matrix3x3;
