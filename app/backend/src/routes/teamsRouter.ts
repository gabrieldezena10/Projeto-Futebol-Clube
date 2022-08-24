import * as express from 'express';
import TeamsController from '../controllers/teamsController';

const teamsRouter = express.Router();

teamsRouter.get('/teams', TeamsController.getAll);

export default teamsRouter;
