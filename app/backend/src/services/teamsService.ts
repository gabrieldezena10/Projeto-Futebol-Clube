import TeamModel from '../database/models/Teams';

export default class TeamsService {
  static async getAll() {
    const users = await TeamModel.findAll();
    return users;
  }

  static async findByTeam(id: string) {
    const user = await TeamModel.findByPk(id);
    return user;
  }
}
