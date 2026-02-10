export type IMatch = {
  id: string;
  opponent: string;
  is_home: boolean;
  match_date: string;
  competition: string;
  stadium: string;
  status: string;
  figueira_score: number | null;
  opponent_score: number | null;
};
