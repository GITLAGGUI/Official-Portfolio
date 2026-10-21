export function validSession(value: unknown): boolean;
export type Counter = { read(): Promise<number>; record(session: string): Promise<number> };
export function createFileCounter(file: string): Counter;
export function createRedisCounter(config: { url?: string; token?: string; fetcher?: typeof fetch }): Counter;
