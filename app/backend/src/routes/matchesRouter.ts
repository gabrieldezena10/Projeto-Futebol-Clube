import * as express from 'express';
import MatchesController from '../controllers/matchesControlles';

const matchesRouter = express.Router();

matchesRouter.get('/matches', MatchesController.getAll);

export default matchesRouter;
