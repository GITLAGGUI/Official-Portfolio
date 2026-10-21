export const themes = [
  { id: 'studio', name: 'Studio Dark', colors: ['#101417', '#87c9df', '#d4deda'] },
  { id: 'light', name: 'Light', colors: ['#f7f7f2', '#236879', '#232c31'] },
  { id: 'vscode', name: 'VS Code', colors: ['#1e1e1e', '#63b6f5', '#d4d4d4'] },
  { id: 'dracula', name: 'Dracula', colors: ['#282a36', '#bd93f9', '#ff79c6'] },
  { id: 'nord', name: 'Nord', colors: ['#2e3440', '#88c0d0', '#eceff4'] },
  { id: 'github', name: 'GitHub Dark', colors: ['#0d1117', '#80c996', '#c9d1d9'] },
  { id: 'monokai', name: 'Monokai', colors: ['#272822', '#e6cf75', '#a6e22e'] },
  { id: 'rose', name: 'Rosé Pine', colors: ['#191724', '#ebbcba', '#c4a7e7'] },
] as const;
export type ThemeId = typeof themes[number]['id'];
export function loadTheme(): ThemeId {
  try { const saved = localStorage.getItem('joel-theme'); if (themes.some((theme) => theme.id === saved)) return saved as ThemeId; } catch { /* Storage is optional. */ }
  return 'studio';
}
