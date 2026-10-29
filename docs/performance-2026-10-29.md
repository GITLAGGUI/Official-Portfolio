# Production performance and public visitors — 29 October 2026

## Measured performance

Google PageSpeed Insights, Lighthouse 13.5.0, canonical production site. These are lab results, not measured real-phone GPU FPS or a guarantee for every device/network.

| Metric | Desktop before | Desktop after | Mobile before | Mobile after |
| --- | ---: | ---: | ---: | ---: |
| Performance | 52 | 100 | 74 | 95 |
| First contentful paint | 718 ms | 363 ms | 2,662 ms | 1,617 ms |
| Largest contentful paint | 1,757 ms | 581 ms | 5,205 ms | 2,360 ms |
| Total blocking time | 9,620 ms | 0 ms | 0 ms | 28 ms |
| Layout shift | 0 | 0 | 0 | 0 |

Before: https://pagespeed.web.dev/analysis/https-joellaggui-vercel-app/kubt70baxg?form_factor=desktop

After performance commit `9fbb508`: https://pagespeed.web.dev/analysis/https-joellaggui-vercel-app/6uxuligxxr?form_factor=desktop

Accessibility improved 98 to 100 through proper project heading order. Best Practices and SEO remain 100.

## Changes

- Same-origin, preloaded variable Latin fonts replace blocking Google Fonts CSS. OFL licenses included.
- Responsive 320/480/640/960px WebP derivatives replace oversized original images in gallery previews. Full-size case-study media remains available.
- Startup no longer preloads full gallery originals before the browser chooses responsive sources. First-screen Home cards use eager images without a staggered opacity reveal.
- WebGL context probing and the real renderer use `failIfMajorPerformanceCaveat`. Unsupported/software-only rendering retains the themed photograph rather than blocking input. The probe releases its context. No Lighthouse or user-agent-specific presentation.
- The actual accelerated 3D portrait remains visible in the local desktop browser; mobile does not mount it.

## Visible visitor counter

User requested a public count in addition to the already enabled Vercel Analytics dashboard. A dedicated Upstash Redis resource `portfolio-visitors` was provisioned under the existing portfolio project after the user accepted the marketplace terms. Free plan, `autoUpgrade=false`, production only. Credentials are server environment variables, never browser configuration or repository content.

The sidebar and status bar share one request after startup. Persistent random browser IDs are SHA256-hashed server-side. Redis deduplication and increment run atomically. Refreshes, navigation and returning tabs with the same storage keep the same count. Known crawler/Headless/Lighthouse user agents do not increment. If local storage is blocked, the widget reads the total without recording another identity. An unavailable service shows a dash, not a fabricated value.

This estimates distinct browsers, not exact individual humans. Clearing storage, another browser/device and sophisticated bots can affect counts. New public totals begin when this release activates; historical uncollected visitors are not invented. Vercel Analytics remains the private dashboard for traffic trends/pageviews and uses its own measurement window.

Tests cover 35 concurrent writes, persistence, repeated identities, shared widget requests, unavailable storage/API behavior, startup, motion scheduling, media references, contact/assistant policy and analytics URL privacy. No email or model request was sent. Final production counter and latest-release PageSpeed verification follows deployment.


## Final release verification

Commit c9102e2 deployed READY dpl_Fb65LYLGT2RAKDgLreTVg1g8Z9zi. Final PageSpeed report https://pagespeed.web.dev/analysis/https-joellaggui-vercel-app/qomlzq0dnh?form_factor=desktop measured99 Desktop /99 Mobile, with100 Accessibility/BestPractices/SEO. Desktop FCP404ms,LCP638ms,TBT46ms,CLS0; Mobile FCP1512ms,LCP1844ms,TBT5ms,CLS0. Twelve new asset hashes and four case-study routes verified against production. Original LeadMaps video200. CounterAPI200, invalidPOST400, foreignorigin403. Browser0→1 thenreload/navigation remained1; subsequenttotal3 persisted in independentrequests.

Owner later explicitly requested a starting total of1,343. An atomic Redis update set portfolio:visits to1343 while preserving3tracked browser identities and writing previousTotal/startingTotal/source=owner-provided/adjustedAt to portfolio:baseline. PublicAPI readback200confirmed1343. This initial total is owner-provided, not measured historical traffic. Existing atomicSADD/INCR logic continues adding one per new browser ID; there is no decrement on departure and no expiry on the total.

Latest request replaces loading screens with route-specific responsive skeletons (Home/gallery/detail/tools/about/services/contact). Initial readiness/skip/timeout remains; no extra dependencies or artificial navigation delays. CSS shimmer uses transform and respects reduced motion/paused motion. The supplied find-skills command was executed and its complete output read; leaderboard confirms VercelReact and Emil design skills, already available locally. Skeleton render checks and existing7suites passed. Browser visual review of this latest skeleton change was blocked by Local browser use disabled in Work settings; no alternate automation used.
