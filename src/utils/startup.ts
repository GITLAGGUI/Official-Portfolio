let sceneReady = false;
const sceneListeners = new Set<() => void>();

export function markSceneReady() {
  sceneReady = true;
  sceneListeners.forEach((ready) => ready());
  sceneListeners.clear();
}

export function waitForScene(signal: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    const finish = () => { sceneListeners.delete(finish); signal.removeEventListener('abort', finish); resolve(); };
    if (sceneReady || signal.aborted) return finish();
    sceneListeners.add(finish);
    signal.addEventListener('abort', finish, { once: true });
  });
}

export async function preloadImage(src: string, signal: AbortSignal): Promise<void> {
  if (signal.aborted) return;
  const image = new Image();
  image.decoding = 'async';
  const loaded = new Promise<void>((resolve) => {
    const finish = () => { image.onload = null; image.onerror = null; signal.removeEventListener('abort', finish); resolve(); };
    image.onload = finish; image.onerror = finish;
    signal.addEventListener('abort', finish, { once: true });
    image.src = src;
  });
  await loaded;
  if (!signal.aborted) await image.decode().catch(() => undefined);
}
