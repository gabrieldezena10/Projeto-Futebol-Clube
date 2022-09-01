import FormatHomeLeaderboard from '../utils/formatHomeLeaderboard';
import MatchesModel from '../database/models/Matches';
import TeamModel from '../database/models/Teams';
import { IRawHomeMatchesLeaderboard } from '../interfaces/ILeaderboard';

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
    });
    return teams;
  }
}
