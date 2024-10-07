export function getEnv(name: string): string | undefined {
  try {
    return typeof process !== 'undefined'
      ? // eslint-disable-next-line no-process-env
        process.env?.[name]
      : undefined
  } catch {
    return undefined
  }
}

function assertImpl(value: unknown, message?: string | Error): asserts value {
  if (value) {
    return
  }

  if (!message) {
    throw new Error('Assertion failed')
  }

  throw typeof message === 'string' ? new Error(message) : message
}

/**
 * Assertion function that defaults to Node.js's `assert` module if it's
 * available, with a basic backup if not.
 */
let assert: (value: unknown, message?: string | Error) => asserts value =
  assertImpl

try {
  // Default to the Node.js assert module if it's available
  const assertImport = await import('node:assert')
  if (assertImport?.default) {
    assert = assertImport.default
  }
} catch {}

export { assert }
