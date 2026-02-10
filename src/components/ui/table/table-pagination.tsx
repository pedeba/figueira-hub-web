import { Tooltip } from '../radix/tootip';
import styles from './table.module.css';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export function TablePagination({ page }: { page: number }) {
  function handleBackPage() {
    if (page <= 1) return;
    navigate({
      to: '/admin/matches',
      search: { _page: page - 1 },
      replace: true,
    });
  }
  function handleNextPage() {
    navigate({
      to: '/admin/matches',
      search: { _page: page + 1 },
      replace: true,
    });
  }
  function handleFirstPage() {
    navigate({ to: '/admin/matches', search: { _page: 1 }, replace: true });
  }
  function handleLastPage() {
    navigate({ to: '/admin/matches', search: { _page: 10 }, replace: true });
  }

  const navigate = useNavigate();
  return (
    <div className={styles.tablePagination}>
      <div>
        <span>1-10 de 100 registros</span>
      </div>
      <div className={styles.paginationButtons}>
        <Tooltip content="Primeira página">
          <button onClick={handleFirstPage} className="btn-secondary">
            <ChevronsLeft size={16} />
          </button>
        </Tooltip>
        <Tooltip content="Página anterior">
          <button onClick={handleBackPage} className="btn-secondary">
            <ChevronLeft size={16} />
          </button>
        </Tooltip>
        <Tooltip content="Próxima página">
          <button onClick={handleNextPage} className="btn-secondary">
            <ChevronRight size={16} />
          </button>
        </Tooltip>
        <Tooltip content="Última página">
          <button onClick={handleLastPage} className="btn-secondary">
            <ChevronsRight size={16} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
