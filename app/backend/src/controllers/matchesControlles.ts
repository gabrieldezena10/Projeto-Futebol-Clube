import { Request, Response } from 'express';
import Jwt from '../utils/jwt';
import MatchesService from '../services/matchesService';
import HTTP_STATUS from '../utils/httpStatus';

export default class MatchesController {
  static async getAll(req: Request, res: Response) {
    const data = await MatchesService.getAll();
    return res.status(HTTP_STATUS.OK).json(data);
  }

  static async createMatch(req: Request, res: Response) {
    const match = req.body;
    const { authorization } = req.headers;
    Jwt.validateToken(authorization);
    const result = await MatchesService.createMatch(match);
    return res.status(HTTP_STATUS.CREATED).json(result);
  }

  static async updateProgress(req: Request, res: Response) {
    const { id } = req.params;
    await MatchesService.updateProgress(+id);
    return res.status(HTTP_STATUS.OK).json({ message: 'Finished' });
  }

  static async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const updatedMatch = req.body;
    await MatchesService.updateMatch(+id, updatedMatch);
    return res.status(HTTP_STATUS.OK).json(updatedMatch);
  }
}
