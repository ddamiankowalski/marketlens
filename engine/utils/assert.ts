const ERROR_PREFIX = 'MARKET_LENS_ERROR: ';

/**
 * Asserts that the value is defined and not null/undefined.
 * @param value
 * @param message
 * @returns
 */
export const assertDefined = <T>(value: T | null | undefined, message = 'Value is not defined'): T => {
  if (value === null || value === undefined) {
    throw new Error(ERROR_PREFIX + message);
  }
  return value;
};
