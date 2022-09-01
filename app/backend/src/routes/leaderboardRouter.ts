import * as express from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboardRouter = express.Router();

leaderboardRouter.get('/leaderboard/home', LeaderboardController.getHomeLeaderboard);
leaderboardRouter.get('/leaderboard/away', LeaderboardController.getAwayLeaderboard);

export default leaderboardRouter;
