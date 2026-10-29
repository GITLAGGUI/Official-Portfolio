import { createRedisCounter, validSession } from '../server/visits.mjs';

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  if (!['GET', 'POST'].includes(request.method)) { response.setHeader('Allow', 'GET, POST'); return response.status(405).json({ error: 'Method not allowed' }); }
  if (request.headers.origin) {
    try { if (new URL(request.headers.origin).host !== request.headers.host) return response.status(403).json({ error: 'Origin not allowed' }); }
    catch { return response.status(403).json({ error: 'Origin not allowed' }); }
  }
  let body = request.body;
  try { if (typeof body === 'string') body = JSON.parse(body); } catch { return response.status(400).json({ error: 'Invalid request' }); }
  if (request.method === 'POST' && !validSession(body?.session)) return response.status(400).json({ error: 'Invalid session' });
  const counter = createRedisCounter({ url: process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN });
  const automated = /bot|crawler|spider|lighthouse|headless|pagespeed|prerender/i.test(request.headers['user-agent'] ?? '');
  try { return response.status(200).json({ count: request.method === 'POST' && !automated ? await counter.record(body.session) : await counter.read() }); }
  catch { return response.status(503).json({ error: 'Visit count temporarily unavailable' }); }
}
