export const themes = [
  { id: 'studio', name: 'Studio Dark', colors: ['#0b0c0f', '#c1d9e8', '#e5e7eb'], portrait: '/assets/profile/joel-profile.webp' },
  { id: 'dracula', name: 'Dracula', colors: ['#282a36', '#bd93f9', '#ff79c6'], portrait: '/assets/profile/themes/dracula.webp' },
  { id: 'github', name: 'GitHub Dark', colors: ['#0d1117', '#80c996', '#c9d1d9'], portrait: '/assets/profile/themes/github.webp' },
  { id: 'monokai', name: 'Monokai', colors: ['#272822', '#e6cf75', '#a6e22e'], portrait: '/assets/profile/themes/monokai.webp' },
  { id: 'vscode', name: 'VS Code', colors: ['#1e1e1e', '#63b6f5', '#d4d4d4'], portrait: '/assets/profile/themes/vscode.webp' },
  { id: 'rose', name: 'Rosé Pine', colors: ['#191724', '#ebbcba', '#c4a7e7'], portrait: '/assets/profile/themes/rose.webp' },
  { id: 'nord', name: 'Nord', colors: ['#2e3440', '#88c0d0', '#eceff4'], portrait: '/assets/profile/themes/nord.webp' },
  { id: 'light', name: 'Light', colors: ['#f7f7f2', '#236879', '#232c31'], portrait: '/assets/profile/themes/light.webp' },
] as const;
export type ThemeId = typeof themes[number]['id'];
export function loadTheme(): ThemeId {
  try { const saved = localStorage.getItem('joel-theme'); if (themes.some((theme) => theme.id === saved)) return saved as ThemeId; } catch { /* Storage is optional. */ }
  return 'studio';
}
