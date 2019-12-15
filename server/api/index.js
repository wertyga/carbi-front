import express from 'express';

import { userRoute } from './user';

export const api = express.Router();

api.use('/user', userRoute);