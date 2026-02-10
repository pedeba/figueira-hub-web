import { createFileRoute } from '@tanstack/react-router';
import { MatchForm } from '../../components/match-form';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import type { IMatch } from '../../types/match.type';

export const Route = createFileRoute('/admin/matches/$match/edit')({
  component: EditMatchPage,
  errorComponent: () => <div>Erro ao carregar partida</div>,
});

function EditMatchPage() {
  return (
    <div className="content-container">
      <h1>Editar Partida</h1>
      <div className="mt-4">
        <Suspense fallback={<div>Carregando...</div>}>
          <EditMatch />
        </Suspense>
      </div>
    </div>
  );
}

function EditMatch() {
  const { match } = Route.useParams();
  const { data } = useSuspenseQuery({
    queryKey: ['match', match],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/matches/${match}`);
      if (!response.ok) throw new Error('Failed to fetch match');
      return (await response.json()) as IMatch;
    },
    staleTime: Infinity,
  });

  return <MatchForm defaultValues={data} />;
}
