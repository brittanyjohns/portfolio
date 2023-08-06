export interface IResultTotals {
  processedAt: string;
  completedAt: string;
  total_results: number;
  successful: string[];
  successfulCount: number;
  failed: string[];
  failedCount: number;
  removed: string[];
  removedCount: number;
  errors: string[];
  errorCount: number;
}
