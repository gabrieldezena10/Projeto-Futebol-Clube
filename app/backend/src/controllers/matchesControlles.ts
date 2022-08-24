import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';
import HTTP_STATUS from '../utils/httpStatus';

export default class MatchesController {
  static async getAll(req: Request, res: Response) {
    const data = await MatchesService.getAll();
    return res.status(HTTP_STATUS.OK).json(data);
  }
}
