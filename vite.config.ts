import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { createFileCounter, validSession } from './server/visits.mjs';

function localVisits() {
  const counter = createFileCounter(resolve('.local/visits.json'));
  return async (request: IncomingMessage, response: ServerResponse) => {
    response.setHeader('Content-Type', 'application/json'); response.setHeader('Cache-Control', 'no-store');
    try {
      if (request.method === 'GET') { response.end(JSON.stringify({ count: await counter.read() })); return; }
      if (request.method !== 'POST') { response.statusCode = 405; response.end('{}'); return; }
      let payload = '';
      for await (const chunk of request) { payload += chunk; if (payload.length > 1024) { response.statusCode = 413; response.end('{}'); return; } }
      let body: { session?: string };
      try { body = JSON.parse(payload); } catch { response.statusCode = 400; response.end('{}'); return; }
      if (!validSession(body?.session)) { response.statusCode = 400; response.end('{}'); return; }
      response.end(JSON.stringify({ count: await counter.record(body.session!) }));
    } catch { response.statusCode = 503; response.end(JSON.stringify({ error: 'Visit count unavailable' })); }
  };
}
export default defineConfig({
  plugins: [react(), {
    name: 'local-visit-counter',
    configureServer(server) { server.middlewares.use('/api/visits', localVisits()); },
    configurePreviewServer(server) { server.middlewares.use('/api/visits', localVisits()); },
  }],
});
