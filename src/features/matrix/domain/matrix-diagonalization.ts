import type {
  DiagonalizationMatrices,
  DiagonalizationResultContract,
  EigenpairResult,
} from "@/features/matrix/domain/matrix-diagonalization.types";
import type {
  ComplexMatrix,
  ComplexNumber,
  ComplexVector,
  MatrixInput,
  MatrixSize,
} from "@/features/matrix/domain/matrix.types";

const EPSILON = 1e-8;
const DISPLAY_EPSILON = 1e-10;

type EigenvalueGroup = Readonly<{
  eigenvalue: ComplexNumber;
  algebraicMultiplicity: number;
}>;

type RrefResult = Readonly<{
  matrix: ComplexNumber[][];
  pivotColumns: readonly number[];
}>;

export function analyzeMatrixDiagonalization(matrix: MatrixInput): DiagonalizationResultContract {
  const size = getMatrixSize(matrix);
  const characteristicPolynomial =
    size === 2 ? getQuadraticCharacteristic(matrix) : getCubicCharacteristic(matrix);
  const eigenvalueGroups = groupEigenvalues(
    findPolynomialRoots(characteristicPolynomial.coefficients),
  );

  const eigenpairs = eigenvalueGroups.map((group) => {
    const eigenvectors = findNullspace(toComplexShiftedMatrix(matrix, group.eigenvalue));

    return {
      eigenvalue: cleanComplex(group.eigenvalue),
      algebraicMultiplicity: group.algebraicMultiplicity,
      geometricMultiplicity: eigenvectors.length,
      eigenvectors,
    } satisfies EigenpairResult;
  });

  const orderedVectors = eigenpairs.flatMap((pair) =>
    pair.eigenvectors.map((eigenvector) => ({
      eigenvalue: pair.eigenvalue,
      eigenvector,
    })),
  );
  const field = eigenpairs.some((pair) => !isRealComplex(pair.eigenvalue)) ? "complex" : "real";
  const warnings =
    field === "complex"
      ? [
          "Complex eigenvalues were found. The diagonal form uses complex-valued matrices, not a purely real basis.",
        ]
      : [];

  if (orderedVectors.length < size) {
    return {
      status: "not-diagonalizable",
      sourceMatrix: matrix,
      size,
      field,
      characteristicPolynomial,
      eigenpairs,
      reason: `The ${size}x${size} matrix has only ${orderedVectors.length} independent eigenvector basis vector(s), so it does not have enough eigenvectors to form P.`,
      warnings,
    };
  }

  const selectedVectors = orderedVectors.slice(0, size);
  const p = buildEigenvectorMatrix(selectedVectors.map((entry) => entry.eigenvector));
  const pInverse = invertComplexMatrix(p);

  if (!pInverse) {
    return {
      status: "not-diagonalizable",
      sourceMatrix: matrix,
      size,
      field,
      characteristicPolynomial,
      eigenpairs,
      reason: "The computed eigenvectors do not form an invertible P matrix.",
      warnings,
    };
  }

  return {
    status: "diagonalizable",
    sourceMatrix: matrix,
    size,
    field,
    characteristicPolynomial,
    eigenpairs,
    matrices: {
      p,
      pInverse,
      d: buildDiagonalMatrix(
        selectedVectors.map((entry) => entry.eigenvalue),
        size,
      ),
    } satisfies DiagonalizationMatrices,
    reason:
      field === "real"
        ? `The matrix has ${size} independent eigenvector basis vector(s), so P is invertible and D = P^-1 A P is diagonal.`
        : `The matrix has ${size} independent eigenvector basis vector(s) over the complex field, so complex-valued P and D can be formed.`,
    warnings,
  };
}

function getMatrixSize(matrix: MatrixInput): MatrixSize {
  return matrix.length === 2 ? 2 : 3;
}

function getQuadraticCharacteristic(matrix: MatrixInput) {
  const [[a, b], [c, d]] = matrix;
  const trace = a + d;
  const determinant = a * d - b * c;

  return {
    coefficients: [1, -trace, determinant],
    expression: `lambda^2 ${formatSignedCoefficient(-trace)}lambda ${formatSignedCoefficient(
      determinant,
    )}`,
  };
}

function getCubicCharacteristic(matrix: MatrixInput) {
  const [[a, b, c], [d, e, f], [g, h, i]] = matrix as Extract<
    MatrixInput,
    readonly [
      readonly [number, number, number],
      readonly [number, number, number],
      readonly [number, number, number],
    ]
  >;
  const trace = a + e + i;
  const principalMinorSum = a * e + a * i + e * i - b * d - c * g - f * h;
  const determinant = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);

  return {
    coefficients: [1, -trace, principalMinorSum, -determinant],
    expression: `lambda^3 ${formatSignedCoefficient(-trace)}lambda^2 ${formatSignedCoefficient(
      principalMinorSum,
    )}lambda ${formatSignedCoefficient(-determinant)}`,
  };
}

function findPolynomialRoots(coefficients: readonly number[]): readonly ComplexNumber[] {
  if (coefficients.length === 3) {
    return solveQuadratic(coefficients[0], coefficients[1], coefficients[2]);
  }

  return solveCubic(coefficients[1], coefficients[2], coefficients[3]);
}

function solveQuadratic(a: number, b: number, c: number): readonly ComplexNumber[] {
  const discriminant = b * b - 4 * a * c;

  if (discriminant >= -EPSILON) {
    const root = Math.sqrt(Math.max(discriminant, 0));

    return [complex((-b + root) / (2 * a)), complex((-b - root) / (2 * a))];
  }

  const imaginary = Math.sqrt(Math.abs(discriminant)) / (2 * a);
  const real = -b / (2 * a);

  return [complex(real, imaginary), complex(real, -imaginary)];
}

function solveCubic(a: number, b: number, c: number): readonly ComplexNumber[] {
  const depressedP = b - (a * a) / 3;
  const depressedQ = (2 * a * a * a) / 27 - (a * b) / 3 + c;
  const discriminant = (depressedQ / 2) ** 2 + (depressedP / 3) ** 3;
  const shift = a / 3;

  if (Math.abs(depressedP) < EPSILON && Math.abs(depressedQ) < EPSILON) {
    return [complex(-shift), complex(-shift), complex(-shift)];
  }

  if (discriminant > EPSILON) {
    const sqrtDiscriminant = Math.sqrt(discriminant);
    const u = cubeRoot(-depressedQ / 2 + sqrtDiscriminant);
    const v = cubeRoot(-depressedQ / 2 - sqrtDiscriminant);
    const realRoot = u + v - shift;
    const complexReal = -(u + v) / 2 - shift;
    const complexImaginary = ((u - v) * Math.sqrt(3)) / 2;

    return [
      complex(realRoot),
      complex(complexReal, complexImaginary),
      complex(complexReal, -complexImaginary),
    ];
  }

  if (Math.abs(discriminant) <= EPSILON) {
    const u = cubeRoot(-depressedQ / 2);

    return [complex(2 * u - shift), complex(-u - shift), complex(-u - shift)];
  }

  const radius = 2 * Math.sqrt(-depressedP / 3);
  const angle = Math.acos(clamp(-depressedQ / 2 / Math.sqrt((-depressedP / 3) ** 3), -1, 1));

  return [0, 1, 2].map((index) =>
    complex(radius * Math.cos((angle + 2 * Math.PI * index) / 3) - shift),
  );
}

function groupEigenvalues(eigenvalues: readonly ComplexNumber[]): readonly EigenvalueGroup[] {
  return eigenvalues.reduce<EigenvalueGroup[]>((groups, eigenvalue) => {
    const existingIndex = groups.findIndex((group) =>
      areComplexClose(group.eigenvalue, eigenvalue, 1e-6),
    );

    if (existingIndex === -1) {
      groups.push({ eigenvalue: cleanComplex(eigenvalue), algebraicMultiplicity: 1 });
      return groups;
    }

    const existing = groups[existingIndex];
    groups[existingIndex] = {
      ...existing,
      algebraicMultiplicity: existing.algebraicMultiplicity + 1,
    };

    return groups;
  }, []);
}

function toComplexShiftedMatrix(matrix: MatrixInput, eigenvalue: ComplexNumber): ComplexNumber[][] {
  return matrix.map((row, rowIndex) =>
    row.map((value, columnIndex) =>
      columnIndex === rowIndex ? subtract(complex(value), eigenvalue) : complex(value),
    ),
  );
}

function findNullspace(matrix: ComplexNumber[][]): readonly ComplexVector[] {
  const columnCount = matrix[0]?.length ?? 0;
  const { matrix: reducedMatrix, pivotColumns } = toRref(matrix);
  const pivotColumnSet = new Set(pivotColumns);
  const freeColumns = Array.from({ length: columnCount }, (_, index) => index).filter(
    (columnIndex) => !pivotColumnSet.has(columnIndex),
  );

  if (freeColumns.length === 0) {
    return [];
  }

  return freeColumns.map((freeColumn) => {
    const vector = Array.from({ length: columnCount }, () => complex(0));
    vector[freeColumn] = complex(1);

    pivotColumns.forEach((pivotColumn, rowIndex) => {
      vector[pivotColumn] = cleanComplex(negate(reducedMatrix[rowIndex][freeColumn]));
    });

    return normalizeVector(vector);
  });
}

function toRref(sourceMatrix: ComplexNumber[][]): RrefResult {
  const matrix = sourceMatrix.map((row) => row.map((value) => ({ ...value })));
  const rowCount = matrix.length;
  const columnCount = matrix[0]?.length ?? 0;
  const pivotColumns: number[] = [];
  let pivotRow = 0;

  for (let column = 0; column < columnCount && pivotRow < rowCount; column += 1) {
    let bestRow = pivotRow;
    let bestMagnitude = magnitude(matrix[bestRow][column]);

    for (let row = pivotRow + 1; row < rowCount; row += 1) {
      const candidateMagnitude = magnitude(matrix[row][column]);

      if (candidateMagnitude > bestMagnitude) {
        bestMagnitude = candidateMagnitude;
        bestRow = row;
      }
    }

    if (bestMagnitude < EPSILON) {
      continue;
    }

    [matrix[pivotRow], matrix[bestRow]] = [matrix[bestRow], matrix[pivotRow]];

    const pivot = matrix[pivotRow][column];
    matrix[pivotRow] = matrix[pivotRow].map((value) => divide(value, pivot));

    for (let row = 0; row < rowCount; row += 1) {
      if (row === pivotRow) {
        continue;
      }

      const factor = matrix[row][column];

      if (magnitude(factor) < EPSILON) {
        continue;
      }

      matrix[row] = matrix[row].map((value, index) =>
        cleanComplex(subtract(value, multiply(factor, matrix[pivotRow][index]))),
      );
    }

    pivotColumns.push(column);
    pivotRow += 1;
  }

  return { matrix, pivotColumns };
}

function buildEigenvectorMatrix(eigenvectors: readonly ComplexVector[]): ComplexMatrix {
  return eigenvectors.map((_, rowIndex) =>
    eigenvectors.map((vector) => cleanComplex(vector[rowIndex])),
  );
}

function buildDiagonalMatrix(
  eigenvalues: readonly ComplexNumber[],
  size: MatrixSize,
): ComplexMatrix {
  return Array.from({ length: size }, (_, rowIndex) =>
    Array.from({ length: size }, (_, columnIndex) =>
      rowIndex === columnIndex ? cleanComplex(eigenvalues[rowIndex]) : complex(0),
    ),
  );
}

function invertComplexMatrix(matrix: ComplexMatrix): ComplexMatrix | null {
  const size = matrix.length;
  const augmented = matrix.map((row, rowIndex) => [
    ...row.map((value) => ({ ...value })),
    ...Array.from({ length: size }, (_, columnIndex) =>
      columnIndex === rowIndex ? complex(1) : complex(0),
    ),
  ]);

  for (let column = 0; column < size; column += 1) {
    let bestRow = column;
    let bestMagnitude = magnitude(augmented[bestRow][column]);

    for (let row = column + 1; row < size; row += 1) {
      const candidateMagnitude = magnitude(augmented[row][column]);

      if (candidateMagnitude > bestMagnitude) {
        bestMagnitude = candidateMagnitude;
        bestRow = row;
      }
    }

    if (bestMagnitude < EPSILON) {
      return null;
    }

    [augmented[column], augmented[bestRow]] = [augmented[bestRow], augmented[column]];

    const pivot = augmented[column][column];
    augmented[column] = augmented[column].map((value) => divide(value, pivot));

    for (let row = 0; row < size; row += 1) {
      if (row === column) {
        continue;
      }

      const factor = augmented[row][column];
      augmented[row] = augmented[row].map((value, index) =>
        cleanComplex(subtract(value, multiply(factor, augmented[column][index]))),
      );
    }
  }

  return augmented.map((row) => row.slice(size).map(cleanComplex));
}

function normalizeVector(vector: readonly ComplexNumber[]): ComplexVector {
  const largest = vector.reduce(
    (currentLargest, entry) => Math.max(currentLargest, magnitude(entry)),
    0,
  );

  if (largest < EPSILON) {
    return vector.map(cleanComplex);
  }

  return vector.map((entry) => cleanComplex(divide(entry, complex(largest))));
}

function complex(real: number, imaginary = 0): ComplexNumber {
  return cleanComplex({ real, imaginary });
}

function subtract(left: ComplexNumber, right: ComplexNumber): ComplexNumber {
  return cleanComplex({
    real: left.real - right.real,
    imaginary: left.imaginary - right.imaginary,
  });
}

function multiply(left: ComplexNumber, right: ComplexNumber): ComplexNumber {
  return cleanComplex({
    real: left.real * right.real - left.imaginary * right.imaginary,
    imaginary: left.real * right.imaginary + left.imaginary * right.real,
  });
}

function divide(left: ComplexNumber, right: ComplexNumber): ComplexNumber {
  const denominator = right.real * right.real + right.imaginary * right.imaginary;

  return cleanComplex({
    real: (left.real * right.real + left.imaginary * right.imaginary) / denominator,
    imaginary: (left.imaginary * right.real - left.real * right.imaginary) / denominator,
  });
}

function negate(value: ComplexNumber): ComplexNumber {
  return cleanComplex({ real: -value.real, imaginary: -value.imaginary });
}

function magnitude(value: ComplexNumber): number {
  return Math.hypot(value.real, value.imaginary);
}

function cleanComplex(value: ComplexNumber): ComplexNumber {
  return {
    real: cleanNumber(value.real),
    imaginary: cleanNumber(value.imaginary),
  };
}

function cleanNumber(value: number): number {
  return Math.abs(value) < DISPLAY_EPSILON ? 0 : value;
}

function isRealComplex(value: ComplexNumber): boolean {
  return Math.abs(value.imaginary) < 1e-7;
}

function areComplexClose(left: ComplexNumber, right: ComplexNumber, tolerance: number): boolean {
  return magnitude(subtract(left, right)) < tolerance;
}

function cubeRoot(value: number): number {
  return value < 0 ? -Math.cbrt(Math.abs(value)) : Math.cbrt(value);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function formatSignedCoefficient(value: number): string {
  const cleaned = cleanNumber(value);

  if (cleaned === 0) {
    return "+ 0";
  }

  return cleaned > 0 ? `+ ${cleaned}` : `- ${Math.abs(cleaned)}`;
}
