"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Calculator, CheckCircle2, RefreshCcw, Rows3, SquareStack, XCircle } from "lucide-react";
import { useMemo, useState, useSyncExternalStore, useTransition } from "react";
import { matrixPresets } from "@/features/matrix/constants/matrix-presets.constants";
import { analyzeMatrixDiagonalization } from "@/features/matrix/domain/matrix-diagonalization";
import type {
  DiagonalizationResultContract,
  EigenpairResult,
} from "@/features/matrix/domain/matrix-diagonalization.types";
import type {
  ComplexMatrix,
  Matrix2x2,
  Matrix3x3,
  MatrixInput,
  MatrixSize,
} from "@/features/matrix/domain/matrix.types";
import {
  formatComplex,
  formatMatrixRows,
  formatVector,
} from "@/features/matrix/utils/format-complex";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/cn";

type MatrixDraft = string[][];

const matrixSizeOptions = [2, 3] as const satisfies readonly MatrixSize[];
const subscribeToHydration = () => () => undefined;
const getHydratedSnapshot = () => true;
const getServerSnapshot = () => false;
const generatedMatrixScalarRange = {
  minimum: -4,
  maximum: 6,
  decimalScale: 100,
} as const;

export function MatrixCalculator() {
  const shouldReduceMotion = useReducedMotion();
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    getHydratedSnapshot,
    getServerSnapshot,
  );
  const [matrixSize, setMatrixSize] = useState<MatrixSize>(2);
  const [draftMatrix, setDraftMatrix] = useState<MatrixDraft>(() =>
    toDraftMatrix(matrixPresets[0].matrix),
  );
  const [result, setResult] = useState<DiagonalizationResultContract | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const visiblePresets = useMemo(
    () => matrixPresets.filter((preset) => preset.size === matrixSize),
    [matrixSize],
  );

  function handleSizeChange(nextSize: MatrixSize) {
    setMatrixSize(nextSize);
    setDraftMatrix(createZeroDraft(nextSize));
    setResult(null);
    setError(null);
  }

  function handleCellChange(rowIndex: number, columnIndex: number, value: string) {
    setDraftMatrix((currentMatrix) =>
      currentMatrix.map((row, currentRowIndex) =>
        row.map((cell, currentColumnIndex) =>
          currentRowIndex === rowIndex && currentColumnIndex === columnIndex ? value : cell,
        ),
      ),
    );
    setError(null);
  }

  function handlePresetSelect(matrix: MatrixInput) {
    setMatrixSize(matrix.length as MatrixSize);
    setDraftMatrix(toDraftMatrix(matrix));
    setResult(null);
    setError(null);
  }

  function handleGenerateMatrix() {
    setDraftMatrix(toDraftMatrix(createGeneratedMatrix(matrixSize)));
    setResult(null);
    setError(null);
  }

  function handleCalculate() {
    const parsedMatrix = parseDraftMatrix(matrixSize, draftMatrix);

    if (!parsedMatrix) {
      setError("Please enter finite numeric values in every matrix cell.");
      setResult(null);
      return;
    }

    startTransition(() => {
      setError(null);
      setResult(analyzeMatrixDiagonalization(parsedMatrix));
    });
  }

  return (
    <div
      className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"
      data-hydrated={isHydrated ? "true" : "false"}
      data-testid="matrix-calculator"
    >
      <motion.div
        className="border-2 border-border-strong bg-background"
        layout
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.28, ease: "easeOut" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-border-strong bg-primary px-5 py-4 text-background">
          <div>
            <p className="font-mono text-xs uppercase text-text-tertiary">Matrix Input</p>
            <h3 className="font-display text-2xl uppercase md:text-3xl">Create A Matrix</h3>
          </div>
          <SquareStack aria-hidden="true" className="h-7 w-7" strokeWidth={2.5} />
        </div>

        <div className="grid gap-6 p-5 md:p-6">
          <fieldset>
            <legend className="font-mono text-xs uppercase text-text-secondary">Matrix size</legend>
            <div className="mt-3 grid grid-cols-2 border-2 border-border-strong">
              {matrixSizeOptions.map((size) => (
                <button
                  aria-pressed={matrixSize === size}
                  className={cn(
                    "px-4 py-3 text-sm font-black uppercase transition-colors",
                    size === 2 ? "border-r-2 border-border-strong" : "",
                    matrixSize === size
                      ? "bg-primary text-background"
                      : "bg-background text-primary hover:bg-surface",
                  )}
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  type="button"
                >
                  {size}x{size}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <p className="font-mono text-xs uppercase text-text-secondary">Sample cases</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {visiblePresets.map((preset) => (
                <button
                  className="border-2 border-border-strong bg-surface px-4 py-3 text-left text-xs font-black uppercase transition-colors hover:bg-primary hover:text-background"
                  key={preset.id}
                  onClick={() => handlePresetSelect(preset.matrix)}
                  type="button"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <MatrixInputGrid
            draftMatrix={draftMatrix}
            matrixSize={matrixSize}
            onCellChange={handleCellChange}
          />

          {error ? (
            <p className="border-2 border-accent bg-background px-4 py-3 text-sm font-bold text-accent">
              {error}
            </p>
          ) : null}

          <div className="grid gap-3 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <Button className="gap-2" onClick={handleGenerateMatrix} variant="secondary">
              <RefreshCcw aria-hidden="true" className="h-4 w-4" />
              Generate Matrix
            </Button>
            <Button className="gap-2" disabled={!isHydrated || isPending} onClick={handleCalculate}>
              <Calculator aria-hidden="true" className="h-4 w-4" />
              Calculate
            </Button>
          </div>
        </div>
      </motion.div>

      <ResultPanel result={result} />
    </div>
  );
}

function MatrixInputGrid({
  draftMatrix,
  matrixSize,
  onCellChange,
}: Readonly<{
  draftMatrix: MatrixDraft;
  matrixSize: MatrixSize;
  onCellChange: (rowIndex: number, columnIndex: number, value: string) => void;
}>) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="font-mono text-xs uppercase text-text-secondary">Editable matrix A</p>
        <p className="font-mono text-xs uppercase text-text-tertiary">
          {matrixSize * matrixSize} values
        </p>
      </div>
      <div
        className="grid gap-2 border-2 border-border-strong bg-surface p-3"
        style={{ gridTemplateColumns: `repeat(${matrixSize}, minmax(0, 1fr))` }}
      >
        {draftMatrix.map((row, rowIndex) =>
          row.map((cell, columnIndex) => (
            <label
              className="group grid aspect-square min-h-20 border-2 border-border-medium bg-background"
              key={`${rowIndex}-${columnIndex}`}
            >
              <span className="sr-only">
                Matrix row {rowIndex + 1}, column {columnIndex + 1}
              </span>
              <input
                className="h-full w-full bg-transparent px-2 text-center font-mono text-xl font-bold text-primary outline-none transition-colors group-focus-within:bg-primary group-focus-within:text-background md:text-2xl"
                inputMode="decimal"
                onChange={(event) => onCellChange(rowIndex, columnIndex, event.target.value)}
                step="any"
                type="number"
                value={cell}
              />
            </label>
          )),
        )}
      </div>
    </div>
  );
}

function ResultPanel({ result }: Readonly<{ result: DiagonalizationResultContract | null }>) {
  return (
    <div className="border-2 border-border-strong bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-border-strong px-5 py-4">
        <div>
          <p className="font-mono text-xs uppercase text-accent">Analysis Output</p>
          <h3 className="font-display text-2xl uppercase md:text-3xl">Diagonalization Report</h3>
        </div>
        <Rows3 aria-hidden="true" className="h-7 w-7" strokeWidth={2.5} />
      </div>

      <div className="min-h-[34rem] p-5 md:p-6">
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-5"
              exit={{ opacity: 0, y: -10 }}
              initial={{ opacity: 0, y: 16 }}
              key={`${result.status}-${result.characteristicPolynomial.expression}`}
              transition={{ duration: 0.26, ease: "easeOut" }}
            >
              <Verdict result={result} />
              <div className="border-2 border-border-strong bg-background p-4">
                <p className="font-mono text-xs uppercase text-text-secondary">
                  Characteristic polynomial
                </p>
                <p className="mt-2 font-mono text-sm font-bold">
                  {result.characteristicPolynomial.expression}
                </p>
              </div>
              <EigenpairList eigenpairs={result.eigenpairs} />
              {result.matrices ? <MatrixSummary matrices={result.matrices} /> : null}
            </motion.div>
          ) : (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex min-h-[30rem] flex-col justify-between border-2 border-border-strong bg-background p-6"
              exit={{ opacity: 0, y: -10 }}
              initial={{ opacity: 0, y: 16 }}
              key="empty"
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              <div>
                <p className="font-mono text-xs uppercase text-accent">Ready</p>
                <p className="mt-4 max-w-xl font-display text-4xl uppercase leading-none md:text-5xl">
                  Build A Matrix. Get The Algebra.
                </p>
              </div>
              <p className="max-w-lg text-sm leading-6 text-text-secondary">
                Choose 2x2 or 3x3, edit values, generate a sample, then calculate eigenvalues,
                eigenvectors, diagonalizability, P, P^-1, and D.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Verdict({ result }: Readonly<{ result: DiagonalizationResultContract }>) {
  const isDiagonalizable = result.status === "diagonalizable";
  const Icon = isDiagonalizable ? CheckCircle2 : XCircle;

  return (
    <div
      className={cn(
        "border-2 p-5",
        isDiagonalizable
          ? "border-border-strong bg-primary text-background"
          : "border-accent bg-background text-primary",
      )}
    >
      <div className="flex items-start gap-4">
        <Icon aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-accent" strokeWidth={2.5} />
        <div>
          <p className="font-mono text-xs uppercase">
            {isDiagonalizable ? "Diagonalizable" : "Not diagonalizable"} / {result.field}
          </p>
          <p className="mt-3 text-sm font-semibold leading-6">{result.reason}</p>
          {result.warnings.map((warning) => (
            <p
              className="mt-3 border-t-2 border-current pt-3 text-xs font-bold uppercase"
              key={warning}
            >
              {warning}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function EigenpairList({ eigenpairs }: Readonly<{ eigenpairs: readonly EigenpairResult[] }>) {
  return (
    <div className="grid gap-3">
      {eigenpairs.map((pair, index) => (
        <div className="border-2 border-border-strong bg-background p-4" key={index}>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-border-medium pb-3">
            <p className="font-mono text-xs uppercase text-text-secondary">
              Eigenvalue {index + 1}
            </p>
            <p className="font-mono text-sm font-black">{formatComplex(pair.eigenvalue)}</p>
          </div>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <p>
              <span className="font-bold uppercase">Algebraic multiplicity:</span>{" "}
              {pair.algebraicMultiplicity}
            </p>
            <p>
              <span className="font-bold uppercase">Eigenvector basis:</span>{" "}
              {pair.geometricMultiplicity}
            </p>
          </div>
          <div className="mt-4 grid gap-2">
            {pair.eigenvectors.map((vector, vectorIndex) => (
              <code
                className="border-2 border-border-medium bg-surface px-3 py-2 text-xs text-text-secondary"
                key={vectorIndex}
              >
                v{vectorIndex + 1} = {formatVector(vector)}
              </code>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function MatrixSummary({
  matrices,
}: Readonly<{ matrices: { p: ComplexMatrix; pInverse: ComplexMatrix; d: ComplexMatrix } }>) {
  return (
    <div className="grid gap-3">
      <MatrixBlock label="P" matrix={matrices.p} />
      <MatrixBlock label="P^-1" matrix={matrices.pInverse} />
      <MatrixBlock label="D = P^-1 A P" matrix={matrices.d} />
    </div>
  );
}

function MatrixBlock({ label, matrix }: Readonly<{ label: string; matrix: ComplexMatrix }>) {
  return (
    <div className="border-2 border-border-strong bg-background p-4">
      <p className="font-mono text-xs uppercase text-accent">{label}</p>
      <div className="mt-3 grid gap-2">
        {formatMatrixRows(matrix).map((row, index) => (
          <code
            className="block bg-surface px-3 py-2 text-xs text-text-secondary"
            key={`${label}-${index}`}
          >
            {row}
          </code>
        ))}
      </div>
    </div>
  );
}

function createZeroDraft(size: MatrixSize): MatrixDraft {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => "0"));
}

function toDraftMatrix(matrix: MatrixInput): MatrixDraft {
  return matrix.map((row) => row.map((value) => String(value)));
}

function parseDraftMatrix(size: MatrixSize, draftMatrix: MatrixDraft): MatrixInput | null {
  const parsed = draftMatrix.map((row) =>
    row.map((cell) => {
      const value = Number(cell);
      return Number.isFinite(value) ? value : null;
    }),
  );

  if (parsed.some((row) => row.some((cell) => cell === null))) {
    return null;
  }

  if (size === 2) {
    return [
      [parsed[0][0] ?? 0, parsed[0][1] ?? 0],
      [parsed[1][0] ?? 0, parsed[1][1] ?? 0],
    ] satisfies Matrix2x2;
  }

  return [
    [parsed[0][0] ?? 0, parsed[0][1] ?? 0, parsed[0][2] ?? 0],
    [parsed[1][0] ?? 0, parsed[1][1] ?? 0, parsed[1][2] ?? 0],
    [parsed[2][0] ?? 0, parsed[2][1] ?? 0, parsed[2][2] ?? 0],
  ] satisfies Matrix3x3;
}

function createGeneratedMatrix(size: MatrixSize): MatrixInput {
  const values = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => createGeneratedScalar()),
  );

  if (size === 2) {
    return [
      [values[0][0] ?? 1, values[0][1] ?? 0],
      [values[1][0] ?? 0, values[1][1] ?? 1],
    ] satisfies Matrix2x2;
  }

  return [
    [values[0][0] ?? 1, values[0][1] ?? 0, values[0][2] ?? 0],
    [values[1][0] ?? 0, values[1][1] ?? 1, values[1][2] ?? 0],
    [values[2][0] ?? 0, values[2][1] ?? 0, values[2][2] ?? 1],
  ] satisfies Matrix3x3;
}

function createGeneratedScalar(): number {
  const range = generatedMatrixScalarRange.maximum - generatedMatrixScalarRange.minimum;
  const rawValue = generatedMatrixScalarRange.minimum + Math.random() * range;
  const roundedValue =
    Math.round(rawValue * generatedMatrixScalarRange.decimalScale) /
    generatedMatrixScalarRange.decimalScale;

  if (!Number.isInteger(roundedValue)) {
    return normalizeGeneratedScalar(roundedValue);
  }

  const decimalValue =
    roundedValue >= generatedMatrixScalarRange.maximum ? roundedValue - 0.25 : roundedValue + 0.25;

  return normalizeGeneratedScalar(decimalValue);
}

function normalizeGeneratedScalar(value: number): number {
  return Object.is(value, -0) ? 0 : value;
}
