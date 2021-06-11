/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/user', 'UserController.index')
Route.post('/user', 'UserController.create')
Route.get('/podcasts', 'PodcastController.index')
Route.get('/podcasts/:userId', 'PodcastController.show').middleware('rss')
Route.post('/podcasts', 'PodcastController.create').middleware('rss')
Route.delete('/podcasts/:podcastId', 'PodcastController.delete').middleware('rss')
Route.get('/episodes', 'EpisodeController.index')
