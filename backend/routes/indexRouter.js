import { Router } from 'express';
/* import { json } from 'express';

app.use(json()); */

const indexRouter = Router();

indexRouter.get('/', function (request, response) {
  response.json({ message: 'hola' });
});

export default indexRouter;
