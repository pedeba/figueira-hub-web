import { createFileRoute } from '@tanstack/react-router'
import { Table } from '../../components/table'
import {keepPreviousData, useQuery} from '@tanstack/react-query'
import { fallback, zodSearchValidator } from '@tanstack/router-zod-adapter'
import { z } from 'zod'

const matchesSearchSchema = z.object({
  _page: fallback(z.number(), 1).default(1),
  _limit: fallback(z.literal(5), 5).default(5),
})

export const Route = createFileRoute('/admin/matches')({
  component: Matches,
  validateSearch: zodSearchValidator(matchesSearchSchema),
})

function Matches() {
  const { _page, _limit } = Route.useSearch()

  const {data: matches, isFetching} = useQuery({
    queryKey: ['matches', _page],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/matches?_page=${_page}&_limit=${_limit}`)
      if (!response.ok) {
        throw new Error('Failed to fetch matches')
      }
      const data = await response.json()
      return data
    },
    staleTime: Infinity,
    placeholderData: keepPreviousData
  })

  if (!matches) return <div>Sem Dados</div>
  return (
    <div className="content-container">
      <h1>Partidas</h1>
      <div className='mt-4'>
        <Table.Root>
          <Table.Head>
            <Table.Row>
              <Table.Cell>Opoenente</Table.Cell>
              <Table.Cell>status</Table.Cell>
              <Table.Cell>Em Casa</Table.Cell>
              <Table.Cell>Data da Partida</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {matches.map((match: any) => (
              <Table.Row key={match.id}>
                <Table.Cell>{match.opponent}</Table.Cell>
                <Table.Cell>{match.status}</Table.Cell>
                <Table.Cell>{match.is_home ? 'Sim' : 'Não'}</Table.Cell>
                <Table.Cell>{match.match_date}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.Cell colSpan={4}>
                {isFetching ? <div>Carregando...</div> : <Table.Pagination page={_page}/>}
              </Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table.Root>
      </div>
    </div>
  )
}
