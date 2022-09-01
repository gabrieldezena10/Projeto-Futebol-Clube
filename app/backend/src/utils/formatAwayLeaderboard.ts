import { IFinalLeaderBoard, IMatchesLeaderboard } from '../interfaces/ILeaderboard';

export default class FormatAwayLeaderboard {
  static getVictories = (awayMatches: IMatchesLeaderboard[]) => {
    const totalWins = awayMatches.reduce((acc: number, e: IMatchesLeaderboard) => {
      if (e.awayTeamGoals > e.homeTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return totalWins;
  };

  static getDraws = (awayMatches: IMatchesLeaderboard[]) => {
    const drawsCount = awayMatches.reduce((acc: number, e: IMatchesLeaderboard) => {
      if (e.awayTeamGoals === e.homeTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return drawsCount;
  };

  static getLosses = (awayMatches: IMatchesLeaderboard[]) => {
    const lossesCount = awayMatches.reduce((acc: number, e: IMatchesLeaderboard) => {
      if (e.awayTeamGoals < e.homeTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return lossesCount;
  };

  static getPoints = (awayMatches: IMatchesLeaderboard[]) => {
    const winPoints = this.getVictories(awayMatches);
    const drawPopints = this.getDraws(awayMatches);
    const points = winPoints * 3 + drawPopints;
    return points;
  };

  static getGoalsInFavor = (awayMatches: IMatchesLeaderboard[]) => {
    const goals = awayMatches.reduce((acc: number, e: IMatchesLeaderboard) =>
      acc + e.awayTeamGoals, 0);
    return goals;
  };

  static getGoalsOwn = (awayMatches: IMatchesLeaderboard[]) => {
    const goals = awayMatches.reduce((acc: number, e: IMatchesLeaderboard) =>
      acc + e.homeTeamGoals, 0);
    return goals;
  };

  static getGoalsBalance = (awayMatches: IMatchesLeaderboard[]) => {
    const balance = this.getGoalsInFavor(awayMatches) - this.getGoalsOwn(awayMatches);
    return balance;
  };

  static getEfficiency = (awayMatches: IMatchesLeaderboard[]) => {
    const result = (this.getPoints(awayMatches) / (awayMatches.length * 3)) * 100;
    return Number(result.toFixed(2));
  };

  static awayLeaderboard = (teamName: string, awayMatches: IMatchesLeaderboard[])
  : IFinalLeaderBoard => {
    const data = {
      name: teamName,
      totalPoints: this.getPoints(awayMatches),
      totalGames: awayMatches.length,
      totalVictories: this.getVictories(awayMatches),
      totalDraws: this.getDraws(awayMatches),
      totalLosses: this.getLosses(awayMatches),
      goalsFavor: this.getGoalsInFavor(awayMatches),
      goalsOwn: this.getGoalsOwn(awayMatches),
      goalsBalance: this.getGoalsBalance(awayMatches),
      efficiency: this.getEfficiency(awayMatches),
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
