import { ReactNode, useEffect, useId, useRef } from 'react';
import { FiX } from 'react-icons/fi';

export default function Dialog({ open, onClose, title, children, className = '' }: { open: boolean; onClose: () => void; title: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !open) return;
    const previous = document.activeElement as HTMLElement | null;
    dialog.showModal();
    dialog.querySelector<HTMLElement>('[data-dialog-focus]')?.focus();
    return () => { dialog.close(); previous?.focus(); };
  }, [open]);
  return <dialog ref={ref} aria-labelledby={titleId} className={`studio-dialog ${className}`} onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <header><h2 id={titleId}>{title}</h2><button type="button" className="icon-button" aria-label="Close dialog" onClick={onClose}><FiX /></button></header>
    {children}
  </dialog>;
}
