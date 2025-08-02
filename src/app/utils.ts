// src/app/utils/date.utils.ts

export interface RawTimestamp {
  seconds: number;
  nanoseconds?: number;       // اختياري
}

/**
 * يحوّل RawTimestamp إلى كائن Date
 */
export function fromRawTimestamp(ts: RawTimestamp): Date {
  // إذا لم تُمرّر nanoseconds نعتمد على 0
  const nano = ts.nanoseconds ?? 0;
  return new Date(ts.seconds * 1000 + nano / 1e6);
}
