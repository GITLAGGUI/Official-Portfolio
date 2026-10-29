import { Analytics } from '@vercel/analytics/react';
import { useLocation } from 'react-router-dom';

// Search fields and contact/assistant text never become analytics payloads.
function cleanAnalyticsEvent<T extends { url: string }>(event: T): T | null {
  try {
    const url = new URL(event.url);
    if (url.hostname !== 'joellaggui.vercel.app') return null;
    url.search = ''; url.hash = '';
    return { ...event, url: url.toString() };
  } catch { return null; }
}

export default function PortfolioAnalytics() {
  const { pathname } = useLocation();
  if (!import.meta.env.PROD || location.hostname !== 'joellaggui.vercel.app') return null;
  return <Analytics mode="production" debug={false} path={pathname} route={pathname.startsWith('/projects/') ? '/projects/:slug' : pathname} beforeSend={cleanAnalyticsEvent} />;
}
