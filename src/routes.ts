import express from 'express';
import SessionController from './controllers/sessionController';
import UserController from './controllers/userController';
import PodcastsController from './controllers/podcastsController';
import EpisodesController from './controllers/episodesController';

import auth from './middleware/authentication';

const router = express.Router();

router.post('/login', SessionController.login);
router.post('/refresh-token/:id', auth, SessionController.refreshToken);

router.get('/users', UserController.index);
router.post('/users', UserController.create);
router.get('/users/:id', auth, UserController.show); // private
router.put('/users/:id', auth, UserController.update); // private
router.delete('/users/:id', auth, UserController.delete); // private

router.get('/podcasts/:id', auth, PodcastsController.index);
router.post('/podcasts/:id', auth, PodcastsController.create);

router.get('/episodes/:id', auth, EpisodesController.index);
export default router;
