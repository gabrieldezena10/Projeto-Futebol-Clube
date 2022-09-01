import TeamModel from '../database/models/Teams';

export interface IRawHomeMatchesLeaderboard extends TeamModel{
  id: number;
  teamName: string;
  homeMatches: {
    id: number;
    homeTeam: number;
    homeTeamGoals: number;
    awayTeam: number;
    awayTeamGoals: number;
    inProgress: boolean;
  }[];
}

export interface IHomeMatchesLeaderboard {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IFinalHomeLeaderBoard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}
