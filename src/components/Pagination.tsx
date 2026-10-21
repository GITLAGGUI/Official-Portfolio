import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
export default function Pagination({ page, pages, onChange, label }: { page: number; pages: number; onChange: (page: number) => void; label: string }) {
  if (pages <= 1) return null;
  return <nav className="pagination" aria-label={label}><button disabled={page === 1} onClick={() => onChange(page - 1)} aria-label="Previous page"><FiArrowLeft /></button><span aria-live="polite">{page} <span>/ {pages}</span></span><button disabled={page === pages} onClick={() => onChange(page + 1)} aria-label="Next page"><FiArrowRight /></button></nav>;
}
