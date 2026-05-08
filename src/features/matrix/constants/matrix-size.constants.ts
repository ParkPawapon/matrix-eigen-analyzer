import type { MatrixSize } from "@/features/matrix/domain/matrix.types";

export const supportedMatrixSizes = [2, 3] as const satisfies readonly MatrixSize[];
