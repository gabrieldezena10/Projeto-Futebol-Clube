import { IFinalLeaderBoard, IMatchesLeaderboard } from '../interfaces/ILeaderboard';

export default class FormatHomeLeaderboard {
  static getVictories = (homeMatches: IMatchesLeaderboard[]) => {
    const totalWins = homeMatches.reduce((acc: number, e: IMatchesLeaderboard) => {
      if (e.homeTeamGoals > e.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return totalWins;
  };

  static getDraws = (homeMatches: IMatchesLeaderboard[]) => {
    const drawsCount = homeMatches.reduce((acc: number, e: IMatchesLeaderboard) => {
      if (e.homeTeamGoals === e.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return drawsCount;
  };

  static getLosses = (homeMatches: IMatchesLeaderboard[]) => {
    const lossesCount = homeMatches.reduce((acc: number, e: IMatchesLeaderboard) => {
      if (e.homeTeamGoals < e.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return lossesCount;
  };

  static getPoints = (homeMatches: IMatchesLeaderboard[]) => {
    const winPoints = this.getVictories(homeMatches);
    const drawPopints = this.getDraws(homeMatches);
    const points = winPoints * 3 + drawPopints;
    return points;
  };

  static getGoalsInFavor = (homeMatches: IMatchesLeaderboard[]) => {
    const goals = homeMatches.reduce((acc: number, e: IMatchesLeaderboard) =>
      acc + e.homeTeamGoals, 0);
    return goals;
  };

  static getGoalsOwn = (homeMatches: IMatchesLeaderboard[]) => {
    const goals = homeMatches.reduce((acc: number, e: IMatchesLeaderboard) =>
      acc + e.awayTeamGoals, 0);
    return goals;
  };

  static getGoalsBalance = (homeMatches: IMatchesLeaderboard[]) => {
    const balance = this.getGoalsInFavor(homeMatches) - this.getGoalsOwn(homeMatches);
    return balance;
  };

  static getEfficiency = (homeMatches: IMatchesLeaderboard[]) => {
    const result = (this.getPoints(homeMatches) / (homeMatches.length * 3)) * 100;
    return Number(result.toFixed(2));
  };

  static homeLeaderboard = (teamName: string, homeMatches: IMatchesLeaderboard[])
  : IFinalLeaderBoard => {
    const data = {
      name: teamName,
      totalPoints: this.getPoints(homeMatches),
      totalGames: homeMatches.length,
      totalVictories: this.getVictories(homeMatches),
      totalDraws: this.getDraws(homeMatches),
      totalLosses: this.getLosses(homeMatches),
      goalsFavor: this.getGoalsInFavor(homeMatches),
      goalsOwn: this.getGoalsOwn(homeMatches),
      goalsBalance: this.getGoalsBalance(homeMatches),
      efficiency: this.getEfficiency(homeMatches),
    };
    return data;
  };

  // https://www.benmvp.com/blog/quick-way-sort-javascript-array-multiple-fields/
  static orderLeaderboard = (leaderboard: IFinalLeaderBoard[]) => {
    const leaderboardSorted = leaderboard.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn
    ));
    return leaderboardSorted;
  };
}
