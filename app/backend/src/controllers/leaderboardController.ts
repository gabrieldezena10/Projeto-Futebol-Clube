import { Request, Response } from 'express';
import HTTP_STATUS from '../utils/httpStatus';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  static async getHomeLeaderboard(req: Request, res: Response) {
    const data = await LeaderboardService.getHomeLeaderboard();
    return res.status(HTTP_STATUS.OK).json(data);
  }

  static async getAwayLeaderboard(req: Request, res: Response) {
    const data = await LeaderboardService.getAwayLeaderboard();
    return res.status(HTTP_STATUS.OK).json(data);
  }

  static async getLeaderboard(req: Request, res: Response) {
    const data = await LeaderboardService.getLeaderboard();
    return res.status(HTTP_STATUS.OK).json(data);
  }
}
