import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { createFileCounter, createRedisCounter, validSession } from '../server/visits.mjs';

const directory = await mkdtemp(join(tmpdir(), 'joel-visits-'));
try {
  const file = join(directory, 'visits.json'); const counter = createFileCounter(file);
  const session = randomUUID();
  assert.equal(validSession(session), true); assert.equal(validSession('../x'), false);
  assert.equal(await counter.read(), 0);
  assert.equal(await counter.record(session), 1);
  assert.equal(await counter.record(session), 1, 'Reload must not double-count a session');
  await Promise.all(Array.from({ length: 35 }, () => counter.record(randomUUID())));
  assert.equal(await counter.read(), 36, 'Concurrent visits must not lose increments');
  assert.equal(await createFileCounter(file).read(), 36, 'Counter must survive server restart');
  assert.equal(await createFileCounter(file).record(session), 36, 'A returning browser session stays deduplicated after restart');
  await assert.rejects(() => counter.record('invalid'), /Invalid session/);
  const requests = [];
  const redis = createRedisCounter({ url: 'https://counter.example', token: 'test-only', fetcher: async (_url, request) => { requests.push(JSON.parse(request.body)); return { ok: true, json: async () => ({ result: 9 }) }; } });
  assert.equal(await redis.record(randomUUID()), 9);
  assert.equal(requests[0][0], 'EVAL'); assert.match(requests[0][1], /SADD/); assert.match(requests[0][1], /INCR/);
  const unavailable = createRedisCounter({ url: 'https://counter.example', token: 'test-only', fetcher: async () => ({ ok: false }) });
  await assert.rejects(() => unavailable.read(), /unavailable/);
  console.log('PASS: shared visits, reload idempotency, 35 concurrent sessions, restart persistence, validation and Redis failure behavior.');
} finally { await rm(directory, { recursive: true, force: true }); }
