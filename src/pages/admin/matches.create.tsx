import { createFileRoute } from '@tanstack/react-router';
import { MatchForm } from '../../components/match-form';

export const Route = createFileRoute('/admin/matches/create')({
  component: CreateMatch,
});

function CreateMatch() {
  return (
    <div className="content-container">
      <h1>Criar Partida</h1>
      <div className="mt-4">
        <MatchForm />
      </div>
    </div>
  );
}
