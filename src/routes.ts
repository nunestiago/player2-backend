import { deleteComp, edit, login, register } from '@controllers/compController';
import express from 'express';

import { verifyAuth } from './middleware/auth';

const routes = express.Router();

routes.post("/register", register);
routes.post("/login", login);

routes.use(verifyAuth);

routes.put("/edit", edit);
routes.delete("/delete", deleteComp);

export default routes;
