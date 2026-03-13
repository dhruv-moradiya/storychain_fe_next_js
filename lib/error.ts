import { isAxiosError } from 'axios';

// ─────────────────────────────────────────────────────────────────────────────
// API Error Shape Types
// ─────────────────────────────────────────────────────────────────────────────

export interface IApiErrorDetail {
  field: string;
  message: string;
  code: string;
}

export interface IApiErrorResponse {
  success: false;
  code: string;
  statusCode: number;
  message: string;
  field?: string;
  details?: {
    context: string;
    errors: IApiErrorDetail[];
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Tries to extract the typed API error payload from an Axios error.
 * Returns null if the error is not an Axios error or has no response data.
 */
export const getApiError = (error: unknown): IApiErrorResponse | null => {
  if (isAxiosError(error) && error.response?.data) {
    const data = error.response.data as IApiErrorResponse;
    if (data && data.success === false) {
      return data;
    }
  }
  return null;
};

/**
 * Extracts a single readable error message from any error shape.
 *
 * Priority:
 * 1. API error `message` field
 * 2. Axios generic `error.message`
 * 3. JS `Error.message`
 * 4. Plain string
 * 5. Fallback
 */
export const getErrorMessage = (
  error: unknown,
  fallbackMessage = 'Something went wrong'
): string => {
  const apiError = getApiError(error);
  if (apiError) {
    return apiError.message || fallbackMessage;
  }

  if (isAxiosError(error)) {
    return error.response?.data?.message || error.message || fallbackMessage;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return fallbackMessage;
};

/**
 * Extracts all field-level validation error details from the API error shape.
 * Returns an empty array when there are no field errors.
 */
export const getFieldErrors = (error: unknown): IApiErrorDetail[] => {
  const apiError = getApiError(error);
  return apiError?.details?.errors ?? [];
};

/**
 * Extracts the error message for a specific field from the API error shape.
 * Returns null when the field is not present in the error details.
 */
export const getFieldError = (error: unknown, field: string): string | null => {
  const errors = getFieldErrors(error);
  return errors.find((e) => e.field === field)?.message ?? null;
};

/**
 * When there are multiple validation errors, formats them all as a
 * bullet-point string. Falls back to `getErrorMessage` for non-validation errors.
 *
 * Useful when you want to display all validation messages to the user at once.
 */
export const getAllErrorMessages = (
  error: unknown,
  fallbackMessage = 'Something went wrong'
): string => {
  const apiError = getApiError(error);
  if (apiError?.details?.errors?.length) {
    return apiError.details.errors.map((e) => e.message).join('\n');
  }
  return getErrorMessage(error, fallbackMessage);
};

/**
 * Converts validation field errors to a record of { field: message } pairs.
 * Convenient for form libraries (e.g. React Hook Form's `setError`).
 */
export const getFieldErrorMap = (error: unknown): Record<string, string> => {
  return getFieldErrors(error).reduce<Record<string, string>>((acc, e) => {
    acc[e.field] = e.message;
    return acc;
  }, {});
};

// In a mutation's onError callback:
// onError: (error) => {
//   // Display main message
//   toast.error(getErrorMessage(error));

//   // Set individual form field errors (react-hook-form):
//   const map = getFieldErrorMap(error);
//   Object.entries(map).forEach(([field, msg]) => setError(field, { message: msg }));

//   // Check a specific field:
//   const titleError = getFieldError(error, 'title');

//   // Show all messages at once:
//   toast.error(getAllErrorMessages(error));
// }
