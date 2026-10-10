import { Router, type Request, type Response } from 'express';
import type { Model } from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

function collectionRouter(model: Model<unknown>): Router {
  const router = Router();

  router.get('/', async (_request: Request, response: Response) => {
    const records = await model.find().lean().exec();
    response.json(records);
  });

  router.get('/:id', async (request: Request, response: Response) => {
    const record = await model.findById(request.params.id).lean().exec();
    if (!record) {
      response.status(404).json({ error: 'Record not found' });
      return;
    }

    response.json(record);
  });

  return router;
}

const router = Router();

router.use('/api/users', collectionRouter(User));
router.use('/api/teams', collectionRouter(Team));
router.use('/api/activities', collectionRouter(Activity));
router.use('/api/leaderboard', collectionRouter(Leaderboard));
router.use('/api/workouts', collectionRouter(Workout));

export default router;
