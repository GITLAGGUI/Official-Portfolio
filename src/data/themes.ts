export const themes = [
  { id: 'studio', name: 'Studio Dark', colors: ['#0b0c0f', '#c1d9e8', '#e5e7eb'], portrait: '/assets/profile/joel-profile.webp', avatar: '/assets/profile/themes/studio-avatar.webp', preview: '/assets/profile/themes/studio-preview.webp' },
  { id: 'dracula', name: 'Dracula', colors: ['#282a36', '#bd93f9', '#ff79c6'], portrait: '/assets/profile/themes/dracula.webp', avatar: '/assets/profile/themes/dracula-avatar.webp', preview: '/assets/profile/themes/dracula-preview.webp' },
  { id: 'github', name: 'GitHub Dark', colors: ['#0d1117', '#80c996', '#c9d1d9'], portrait: '/assets/profile/themes/github.webp', avatar: '/assets/profile/themes/github-avatar.webp', preview: '/assets/profile/themes/github-preview.webp' },
  { id: 'monokai', name: 'Monokai', colors: ['#272822', '#e6cf75', '#a6e22e'], portrait: '/assets/profile/themes/monokai.webp', avatar: '/assets/profile/themes/monokai-avatar.webp', preview: '/assets/profile/themes/monokai-preview.webp' },
  { id: 'vscode', name: 'VS Code', colors: ['#1e1e1e', '#63b6f5', '#d4d4d4'], portrait: '/assets/profile/themes/vscode.webp', avatar: '/assets/profile/themes/vscode-avatar.webp', preview: '/assets/profile/themes/vscode-preview.webp' },
  { id: 'rose', name: 'Rosé Pine', colors: ['#191724', '#ebbcba', '#c4a7e7'], portrait: '/assets/profile/themes/rose.webp', avatar: '/assets/profile/themes/rose-avatar.webp', preview: '/assets/profile/themes/rose-preview.webp' },
  { id: 'nord', name: 'Nord', colors: ['#2e3440', '#88c0d0', '#eceff4'], portrait: '/assets/profile/themes/nord.webp', avatar: '/assets/profile/themes/nord-avatar.webp', preview: '/assets/profile/themes/nord-preview.webp' },
  { id: 'light', name: 'Light', colors: ['#f7f7f2', '#236879', '#232c31'], portrait: '/assets/profile/themes/light.webp', avatar: '/assets/profile/themes/light-avatar.webp', preview: '/assets/profile/themes/light-preview.webp' },
] as const;
export type ThemeId = typeof themes[number]['id'];
export function loadTheme(): ThemeId {
  try { const saved = localStorage.getItem('joel-theme'); if (themes.some((theme) => theme.id === saved)) return saved as ThemeId; } catch { /* Storage is optional. */ }
  return 'studio';
}
