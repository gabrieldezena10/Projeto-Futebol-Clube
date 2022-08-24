import TeamModel from '../database/models/Teams';
import MatchesModel from '../database/models/Matches';

export default class MatchesService {
  static async getAll() {
    const matches = await MatchesModel.findAll({
      include: [
        { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },

      ],
    });
    return matches;
  }
}
