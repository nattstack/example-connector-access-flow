interface Failure {
  data: undefined
  error: unknown
}

interface Success<Value> {
  data: Value
  error: undefined
}

export async function tryCatch<Value>(fn: () => Promise<Value>): Promise<Failure | Success<Value>> {
  try {
    return { data: await fn(), error: undefined }
  } catch (error) {
    return { data: undefined, error }
  }
}
