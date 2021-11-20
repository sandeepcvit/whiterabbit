import express from "express";
const router = express.Router();

import UserInformationRouter from './modules/userinformation/userinformation.router';

router.use("/userinformation", UserInformationRouter);

export default router;