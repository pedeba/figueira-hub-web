import { FormProvider, useForm } from 'react-hook-form';
import { Form } from './ui/form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckBox } from './ui/radix/checkbox';
import { Select, SelectItem } from './ui/radix/select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { IMatch } from '../types/match.type';
import { useNavigate } from '@tanstack/react-router';
import { ToastComponent } from './ui/radix/toast';

const matchSchema = z.object({
  opponent: z.string().nonempty('Oponente é obrigatório'),
  is_home: z.boolean().optional(),
  match_date: z.string().nonempty('Data da partida é obrigatória'),
  competition: z.string().nonempty('Competição é obrigatória'),
  stadium: z.string().nonempty('Estádio é obrigatório'),
  status: z.string().nonempty('Status é obrigatório'),
  figueira_score: z.preprocess(
    (val) => (val === '' || val === undefined ? null : Number(val)),
    z.number().nullable(),
  ),
  opponent_score: z.preprocess(
    (val) => (val === '' || val === undefined ? null : Number(val)),
    z.number().nullable(),
  ),
});

type MatchSchemaType = z.infer<typeof matchSchema>;

export function MatchForm({ defaultValues }: { defaultValues?: IMatch } = {}) {
  const navigate = useNavigate();
  const createMatchForm = useForm({
    resolver: zodResolver(matchSchema),
    defaultValues,
  });

  const { handleSubmit } = createMatchForm;

  const queryClient = useQueryClient();

  const {
    mutate: updateMatch,
    isPending: isUpdating,
    error: updateError,
    isSuccess: isUpdateSuccess,
    reset: resetUpdate,
  } = useMutation({
    mutationFn: async (data: MatchSchemaType) => {
      const response = await fetch(
        `http://localhost:3333/matches/${defaultValues?.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );
      if (!response.ok) throw new Error('Failed to update match');
      return (await response.json()) as IMatch;
    },
    onSuccess: (data) => {
      if (data?.id) {
        queryClient.setQueryData(['match', String(data.id)], data);
      }
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
  });

  const {
    mutate: createMatch,
    isPending: isCreating,
    error: createError,
    isSuccess: isCreateSuccess,
    reset: resetCreate,
  } = useMutation({
    mutationFn: async (data: MatchSchemaType) => {
      const response = await fetch(`http://localhost:3333/matches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create match');
      return (await response.json()) as IMatch;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      navigate({ to: '/admin/matches' });
    },
  });

  const onSubmit = (data: MatchSchemaType) => {
    if (defaultValues) {
      updateMatch(data);
      return;
    }
    createMatch(data);
  };

  return (
    <>
      {(updateError || createError) && (
        <ToastComponent
          open={!!updateError || !!createError}
          onOpenChange={(open) => !open && (resetUpdate(), resetCreate())}
          title="Erro ao salvar partida"
          description={
            updateError?.message ||
            createError?.message ||
            'Erro ao salvar partida'
          }
          variant="error"
        />
      )}

      {isUpdateSuccess && (
        <ToastComponent
          open={!!isUpdateSuccess}
          onOpenChange={(open) => !open && resetUpdate()}
          title="Partida salva com sucesso"
          description="Partida salva com sucesso"
          variant="success"
        />
      )}

      <FormProvider {...createMatchForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex row gap-4 justify-between mb-4">
            <Form.Field className="flex-1">
              <Form.Label htmlFor="opponent">Oponente*</Form.Label>
              <Form.Input
                id="opponent"
                type="text"
                name="opponent"
                placeholder="Digite o nome do oponente"
              />
              <Form.ErrorMessage field="opponent" />
            </Form.Field>
            <Form.Field className="flex-1">
              <Form.Label htmlFor="competition">Competição*</Form.Label>
              <Form.Input
                id="competition"
                type="text"
                name="competition"
                placeholder="Digite o nome do campeonato"
              />
              <Form.ErrorMessage field="competition" />
            </Form.Field>
          </div>
          <div className="flex row gap-4 justify-between mb-4">
            <Form.Field className="flex-1">
              <Form.Label htmlFor="stadium">Estádio*</Form.Label>
              <Form.Input
                id="stadium"
                type="text"
                name="stadium"
                placeholder="Digite o nome do estádio"
              />
              <Form.ErrorMessage field="stadium" />
            </Form.Field>
            <div className="flex-1 flex items-center">
              <CheckBox id="is_home" label="Partida em casa" name="is_home" />
            </div>
          </div>
          <div className="flex row gap-4 justify-between mb-4">
            <Form.Field className="flex-1">
              <Form.Label htmlFor="match_date">Data e Hora*</Form.Label>
              <Form.Input
                id="match_date"
                type="datetime-local"
                name="match_date"
                placeholder="Digite a data e hora da partida"
              />
              <Form.ErrorMessage field="match_date" />
            </Form.Field>
            <Form.Field className="flex-1">
              <Form.Label htmlFor="status">Status*</Form.Label>
              <Select id="status" name="status" defaultValue="scheduled">
                <SelectItem value="scheduled">Agendada</SelectItem>
                <SelectItem value="finished">Encerrada</SelectItem>
                <SelectItem value="canceled">Cancelada</SelectItem>
              </Select>
              <Form.ErrorMessage field="status" />
            </Form.Field>
          </div>
          <div className="flex row gap-4 justify-between mb-4">
            <Form.Field className="flex-1">
              <Form.Label htmlFor="figueira_score">Gols da Figueira</Form.Label>
              <Form.Input
                id="figueira_score"
                type="number"
                name="figueira_score"
              />
              <Form.ErrorMessage field="figueira_score" />
            </Form.Field>
            <Form.Field className="flex-1">
              <Form.Label htmlFor="opponent_score">Gols do Oponente</Form.Label>
              <Form.Input
                id="opponent_score"
                type="number"
                name="opponent_score"
              />
              <Form.ErrorMessage field="opponent_score" />
            </Form.Field>
          </div>
          {isUpdating || isCreating ? (
            <button disabled className="btn-secondary">
              {defaultValues ? 'Editando...' : 'Criando...'}
            </button>
          ) : (
            <button type="submit">
              {defaultValues ? 'Editar' : 'Criar'} Partida
            </button>
          )}
        </form>
      </FormProvider>
    </>
  );
}
