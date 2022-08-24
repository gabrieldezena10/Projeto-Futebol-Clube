export default interface IMatch {
  id?: number;
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress?: boolean;
}

export interface IMatchGoals {
  homeTeamGoals: number,
  awayTeamGoals: number,
}
