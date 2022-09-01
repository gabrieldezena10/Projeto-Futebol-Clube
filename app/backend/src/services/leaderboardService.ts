import FormatHomeLeaderboard from '../utils/formatHomeLeaderboard';
import MatchesModel from '../database/models/Matches';
import TeamModel from '../database/models/Teams';
import { IRawAwayMatchesLeaderboard,
  IRawHomeMatchesLeaderboard, IRawMatchesLeaderboard } from '../interfaces/ILeaderboard';
import FormatAwayLeaderboard from '../utils/formatAwayLeaderboard';
import FormatLeaderboard from '../utils/formatLeaderboard';

export default class LeaderboardService {
  static async getHomeLeaderboard() {
    const teams = await TeamModel.findAll({
      include: [
        { model: MatchesModel, as: 'homeMatches', where: { inProgress: false } },
      ],
    }) as IRawHomeMatchesLeaderboard[];
    const randomMatches = teams.map(({ teamName, homeMatches }) => {
      const data = FormatHomeLeaderboard.homeLeaderboard(teamName, homeMatches);
      return data;
    });
    const sortedMatches = FormatHomeLeaderboard.orderLeaderboard(randomMatches);
    return sortedMatches;
  }

  static async getAwayLeaderboard() {
    const teams = await TeamModel.findAll({
      include: [
        { model: MatchesModel, as: 'awayMatches', where: { inProgress: false } },
      ],
    }) as IRawAwayMatchesLeaderboard[];
    const randomMatches = teams.map(({ teamName, awayMatches }) => {
      const data = FormatAwayLeaderboard.awayLeaderboard(teamName, awayMatches);
      return data;
    });
    const sortedMatches = FormatHomeLeaderboard.orderLeaderboard(randomMatches);
    return sortedMatches;
  }

  static async getLeaderboard() {
    const teams = await TeamModel.findAll({
      include: [
        { model: MatchesModel, as: 'homeMatches', where: { inProgress: false } },
        { model: MatchesModel, as: 'awayMatches', where: { inProgress: false } },
      ],
    }) as IRawMatchesLeaderboard[];
    const randomMatches = teams.map(({ teamName, homeMatches, awayMatches }) => {
      const data = FormatLeaderboard.leaderboard(teamName, homeMatches, awayMatches);
      return data;
    });
    const sortedMatches = FormatLeaderboard.orderLeaderboard(randomMatches);
    return sortedMatches;
  }
}
