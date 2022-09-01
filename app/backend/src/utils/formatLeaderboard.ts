import { IFinalLeaderBoard, IMatchesLeaderboard } from '../interfaces/ILeaderboard';
import FormatAwayLeaderboard from './formatAwayLeaderboard';
import FormatHomeLeaderboard from './formatHomeLeaderboard';

export default class FormatLeaderboard {
  static getEfficiency = (hM: IMatchesLeaderboard[], aM: IMatchesLeaderboard[]) => {
    const sumPoints = FormatHomeLeaderboard.getPoints(hM)
      + FormatAwayLeaderboard.getPoints(aM);
    const sumGames = hM.length + aM.length;

    const result = (sumPoints / (sumGames * 3)) * 100;
    return Number(result.toFixed(2));
  };

  static leaderboard = (teamName: string, hM: IMatchesLeaderboard[], aM: IMatchesLeaderboard[]) => {
    const result = {
      name: teamName,
      totalPoints: FormatHomeLeaderboard.getPoints(hM) + FormatAwayLeaderboard.getPoints(aM),
      totalGames: hM.length + aM.length,
      totalVictories: FormatHomeLeaderboard.getVictories(hM)
      + FormatAwayLeaderboard.getVictories(aM),
      totalDraws: FormatHomeLeaderboard.getDraws(hM) + FormatAwayLeaderboard.getDraws(aM),
      totalLosses: FormatHomeLeaderboard.getLosses(hM) + FormatAwayLeaderboard.getLosses(aM),
      goalsFavor: FormatHomeLeaderboard.getGoalsInFavor(hM)
      + FormatAwayLeaderboard.getGoalsInFavor(aM),
      goalsOwn: FormatHomeLeaderboard.getGoalsOwn(hM) + FormatAwayLeaderboard.getGoalsOwn(aM),
      goalsBalance: FormatHomeLeaderboard.getGoalsBalance(hM)
      + FormatAwayLeaderboard.getGoalsBalance(aM),
      efficiency: this.getEfficiency(hM, aM),
    };
    return result;
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
