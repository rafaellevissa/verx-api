/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import ProducersController from '#controllers/producers_controller'
import router from '@adonisjs/core/services/router'

router.get('/producers', [ProducersController, 'index'])
router.post('/producers', [ProducersController, 'store'])
router.get('/producers/:id', [ProducersController, 'show'])
router.patch('/producers/:id', [ProducersController, 'update'])
router.delete('/producers/:id', [ProducersController, 'destroy'])
router.get('/dashboard', [ProducersController, 'dashboard'])
