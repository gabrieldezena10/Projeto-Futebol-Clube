import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';
import HTTP_STATUS from '../utils/httpStatus';

export default class TeamsController {
  static async getAll(req: Request, res: Response) {
    const data = await TeamsService.getAll();
    return res.status(HTTP_STATUS.OK).json(data);
  }

  static async findByTeam(req: Request, res: Response) {
    const { id } = req.params;
    const data = await TeamsService.findByTeam(id);
    return res.status(HTTP_STATUS.OK).json(data);
  }
}
