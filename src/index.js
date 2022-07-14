import dotenv from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDatabase } from './database/database.js';
import { routerUsers } from './users/users.route.js';
import { routerAuth } from './auth/auth.route.js';
import { routerChar } from './Characters/characters.route.js';
import { router } from './swagger/swagger.routes.js';

const port = process.env.PORT || 3001;
const app = express();

connectDatabase();
app.use(cors());
app.use(express.json());

app.use('/users', routerUsers);
app.use('/auth', routerAuth);
app.use('/characters', routerChar);
app.use('/api-docs', router);

app.listen(port, () => {
  console.log(`porta ${port}`);
});
