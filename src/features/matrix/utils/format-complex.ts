import type {
  ComplexMatrix,
  ComplexNumber,
  ComplexVector,
} from "@/features/matrix/domain/matrix.types";

export function formatComplex(value: ComplexNumber, precision = 4): string {
  const real = formatScalar(value.real, precision);
  const imaginaryMagnitude = formatScalar(Math.abs(value.imaginary), precision);

  if (Math.abs(value.imaginary) < 1e-8) {
    return real;
  }

  if (Math.abs(value.real) < 1e-8) {
    return `${value.imaginary < 0 ? "-" : ""}${imaginaryMagnitude}i`;
  }

  return `${real} ${value.imaginary < 0 ? "-" : "+"} ${imaginaryMagnitude}i`;
}

export function formatVector(vector: ComplexVector): string {
  return `[${vector.map((entry) => formatComplex(entry)).join(", ")}]`;
}

export function formatMatrixRows(matrix: ComplexMatrix): readonly string[] {
  return matrix.map((row) => `[${row.map((entry) => formatComplex(entry)).join(", ")}]`);
}

function formatScalar(value: number, precision: number): string {
  if (Math.abs(value) < 1e-8) {
    return "0";
  }

  if (Number.isInteger(Math.round(value)) && Math.abs(value - Math.round(value)) < 1e-8) {
    return String(Math.round(value));
  }

  return Number(value.toFixed(precision)).toString();
}
