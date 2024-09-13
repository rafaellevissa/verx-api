/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import swagger from '#config/swagger';
import router from '@adonisjs/core/services/router'
import AutoSwagger from "adonis-autoswagger";

const ProducersController = () => import('#controllers/producers_controller')

router.get("/swagger", async () => {
    return AutoSwagger.default.docs(router.toJSON(), swagger);
});
  
router.get("/docs", async () => {
    return AutoSwagger.default.ui("/swagger", swagger);
});

router.get('/producers', [ProducersController, 'index'])
router.post('/producers', [ProducersController, 'store'])
router.get('/producers/:id', [ProducersController, 'show'])
router.patch('/producers/:id', [ProducersController, 'update'])
router.delete('/producers/:id', [ProducersController, 'destroy'])
router.get('/dashboard', [ProducersController, 'dashboard'])
