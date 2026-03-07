import { isAxiosError } from 'axios';

/**
 * Extracts a readable error message from an unknown error object.
 * Checks if it's an Axios error or standard Error.
 *
 * @param error The unknown error object
 * @param fallbackMessage A fallback message if no specific error message can be extracted
 * @returns A string representing the error message
 */
export const getErrorMessage = (
  error: unknown,
  fallbackMessage = 'Something went wrong'
): string => {
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
