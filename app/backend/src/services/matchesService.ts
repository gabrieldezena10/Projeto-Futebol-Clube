import TeamModel from '../database/models/Teams';
import MatchesModel from '../database/models/Matches';
import IMatch, { IMatchGoals } from '../interfaces/IMatch';
import CustomError from '../utils/customError';
import HTTP_STATUS from '../utils/httpStatus';

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

  static async createMatch(game: IMatch) {
    const { homeTeam, awayTeam } = game;
    if (homeTeam === awayTeam) {
      throw new CustomError(
        HTTP_STATUS.UNAUTHORIZED,
        'It is not possible to create a match with two equal teams',
      );
    }
    const findHomeTeam = await TeamModel.findOne({ where: { id: homeTeam } });
    const findOpponentTeam = await TeamModel.findOne({ where: { id: awayTeam } });
    if (!findHomeTeam || !findOpponentTeam) {
      throw new CustomError(
        HTTP_STATUS.NOT_FOUND,
        'There is no team with such id!',
      );
    }

    const newMatch = await MatchesModel.create({ ...game, inProgress: true });
    return newMatch;
  }

  static async updateProgress(id: number) {
    await MatchesModel.update({ inProgress: false }, { where: { id } });
  }

  static async updateMatch(id: number, updatedMatch: IMatchGoals) {
    await MatchesModel.update({ ...updatedMatch }, { where: { id } });
  }
}
