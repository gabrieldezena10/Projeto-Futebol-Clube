import * as express from 'express';
import MatchesController from '../controllers/matchesControlles';

const matchesRouter = express.Router();

matchesRouter.get('/matches', MatchesController.getAll);
matchesRouter.post('/matches', MatchesController.createMatch);
matchesRouter.patch('/matches/:id/finish', MatchesController.updateProgress);
matchesRouter.patch('/matches/:id', MatchesController.updateMatch);

export default matchesRouter;
