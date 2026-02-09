import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/matches/$match/edit')({
  component: EditMatch,
});

function EditMatch() {
  return (
    <div>
      <h1>Editar Partida</h1>
    </div>
  );
}
