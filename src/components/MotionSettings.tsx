import { ReactNode, useEffect, useState } from 'react';
import { MotionContext } from './motion-context';

export function MotionSettings({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(() => {
    try { return localStorage.getItem('joel-motion') === 'paused'; } catch { return false; }
  });
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? 'paused' : 'running';
    try { localStorage.setItem('joel-motion', paused ? 'paused' : 'running'); } catch { /* Storage is optional. */ }
  }, [paused]);
  return <MotionContext.Provider value={{ paused, toggle: () => setPaused((value) => !value) }}>{children}</MotionContext.Provider>;
}
