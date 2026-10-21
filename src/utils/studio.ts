export const sections = [
  { label: 'Home', href: '/' }, { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' }, { label: 'Tools', href: '/tools' },
  { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' },
];
export const resume = '/assets/resume/Joel_Laggui_Resume_ATS_2026.pdf';
export function studioAction(action: string) { window.dispatchEvent(new CustomEvent('studio-action', { detail: action })); }
