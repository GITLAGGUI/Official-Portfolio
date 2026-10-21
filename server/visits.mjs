import { readFile, mkdir, rename, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { createHash, randomUUID } from 'node:crypto';

export const validSession = (value) => typeof value === 'string' && /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(value);
const requireSession = (value) => { if (!validSession(value)) throw new Error('Invalid session'); };

// Development only. One queue serializes writes and an atomic rename prevents partial files.
export function createFileCounter(file) {
  let pending = Promise.resolve();
  async function load() {
    try {
      const data = JSON.parse(await readFile(file, 'utf8'));
      if (!Number.isSafeInteger(data.count) || data.count < 0 || !data.sessions || typeof data.sessions !== 'object') throw new Error('Counter storage is invalid');
      return data;
    } catch (error) { if (error.code === 'ENOENT') return { count: 0, sessions: {} }; throw error; }
  }
  return {
    async read() { await pending; return (await load()).count; },
    async record(session) {
      requireSession(session);
      const operation = pending.then(async () => {
        const data = await load();
        const id = createHash('sha256').update(session).digest('hex');
        if (data.sessions[id]) return data.count;
        data.sessions[id] = true; data.count += 1;
        await mkdir(dirname(file), { recursive: true });
        const temporary = `${file}.${randomUUID()}.tmp`;
        await writeFile(temporary, JSON.stringify(data), { mode: 0o600 }); await rename(temporary, file);
        return data.count;
      });
      pending = operation.catch(() => undefined); return operation;
    },
  };
}

// Session deduplication and increment run as a single atomic Redis operation.
const recordScript = `
  local added = redis.call('SADD', KEYS[1], ARGV[1])
  if added == 1 then return redis.call('INCR', KEYS[2]) end
  return tonumber(redis.call('GET', KEYS[2]) or '0')
`;
export function createRedisCounter({ url, token, fetcher = fetch }) {
  async function command(args) {
    if (!url || !token) throw new Error('Visit storage unavailable');
    const response = await fetcher(url, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(args), signal: AbortSignal.timeout(5000) });
    if (!response.ok) throw new Error('Visit storage unavailable');
    const data = await response.json();
    if (data.error) throw new Error('Visit storage unavailable');
    const count = Number(data.result ?? 0); if (!Number.isSafeInteger(count) || count < 0) throw new Error('Visit storage unavailable');
    return count;
  }
  return {
    read: () => command(['GET', 'portfolio:visits']),
    record: (session) => { requireSession(session); return command(['EVAL', recordScript, 2, 'portfolio:sessions', 'portfolio:visits', createHash('sha256').update(session).digest('hex')]); },
  };
}
