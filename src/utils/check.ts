// Shared test helpers for all solution modules under src.

// Deep-equality assertion via JSON comparison (also covers primitives).
const check = (name: string, actual: unknown, expected: unknown): void => {
  console.log(JSON.stringify(actual) === JSON.stringify(expected)
    ? `PASS ${name}`
    : `FAIL ${name}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`)
}

// Boolean assertion for cases that need custom comparison (e.g. reference equality).
const checkTrue = (name: string, pass: boolean, detail = ""): void => {
  console.log(pass ? `PASS ${name}` : `FAIL ${name}${detail ? `: ${detail}` : ""}`)
}

export { check, checkTrue }
