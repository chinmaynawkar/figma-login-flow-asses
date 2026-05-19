export const NETWORK_ERROR_MESSAGE =
  "Request timed out. Please try again.";

export const NETWORK_TIMEOUT_MS = 3000;

export interface RunAsyncStepOptions {
  delayMs: number;
  onSuccess: () => void;
  onError: (message: string) => void;
  onSetLoading: (loading: boolean) => void;
}

/**
 * Simulates an async step action with loading state.
 * If the action exceeds NETWORK_TIMEOUT_MS, invokes onError (mock network failure).
 */
export function runAsyncStep({
  delayMs,
  onSuccess,
  onError,
  onSetLoading,
}: RunAsyncStepOptions): void {
  onSetLoading(true);

  let completed = false;

  const networkTimer = window.setTimeout(() => {
    if (!completed) {
      onSetLoading(false);
      onError(NETWORK_ERROR_MESSAGE);
    }
  }, NETWORK_TIMEOUT_MS);

  window.setTimeout(() => {
    completed = true;
    window.clearTimeout(networkTimer);
    onSuccess();
    onSetLoading(false);
  }, delayMs);
}
