import express from 'express';

import { getUserProfile } from '../controllers/users';

export const profileRouter = express.Router();

// International Standard Book Number (ISBN)
/* GET user's profile */
profileRouter.get('/', getUserProfile);
