import { IFinalHomeLeaderBoard, IHomeMatchesLeaderboard } from '../interfaces/ILeaderboard';

export default class FormatHomeLeaderboard {
  private static getVictories = (homeMatches: IHomeMatchesLeaderboard[]) => {
    const totalWins = homeMatches.reduce((acc: number, e: IHomeMatchesLeaderboard) => {
      if (e.homeTeamGoals > e.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return totalWins;
  };

  private static getDraws = (homeMatches: IHomeMatchesLeaderboard[]) => {
    const drawsCount = homeMatches.reduce((acc: number, e: IHomeMatchesLeaderboard) => {
      if (e.homeTeamGoals === e.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return drawsCount;
  };

  private static getLosses = (homeMatches: IHomeMatchesLeaderboard[]) => {
    const lossesCount = homeMatches.reduce((acc: number, e: IHomeMatchesLeaderboard) => {
      if (e.homeTeamGoals < e.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return lossesCount;
  };

  private static getPoints = (homeMatches: IHomeMatchesLeaderboard[]) => {
    const winPoints = this.getVictories(homeMatches);
    const drawPopints = this.getDraws(homeMatches);
    const points = winPoints * 3 + drawPopints;
    return points;
  };

  private static getGoalsInFavor = (homeMatches: IHomeMatchesLeaderboard[]) => {
    const goals = homeMatches.reduce((acc: number, e: IHomeMatchesLeaderboard) =>
      acc + e.homeTeamGoals, 0);
    return goals;
  };

  private static getGoalsOwn = (homeMatches: IHomeMatchesLeaderboard[]) => {
    const goals = homeMatches.reduce((acc: number, e: IHomeMatchesLeaderboard) =>
      acc + e.awayTeamGoals, 0);
    return goals;
  };

  private static getGoalsBalance = (homeMatches: IHomeMatchesLeaderboard[]) => {
    const balance = this.getGoalsInFavor(homeMatches) - this.getGoalsOwn(homeMatches);
    return balance;
  };

  private static getEfficiency = (homeMatches: IHomeMatchesLeaderboard[]) => {
    const result = (this.getPoints(homeMatches) / (homeMatches.length * 3)) * 100;
    return Number(result.toFixed(2));
  };

  static homeLeaderboard = (teamName: string, homeMatches: IHomeMatchesLeaderboard[])
  : IFinalHomeLeaderBoard => {
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
  static orderLeaderboard = (leaderboard: IFinalHomeLeaderBoard[]) => {
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
