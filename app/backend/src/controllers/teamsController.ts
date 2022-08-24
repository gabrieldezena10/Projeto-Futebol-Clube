import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';
import HTTP_STATUS from '../utils/httpStatus';

export default class TeamsController {
  static async getAll(req: Request, res: Response) {
    const data = await TeamsService.getAll();
    return res.status(HTTP_STATUS.OK).json(data);
  }
}
