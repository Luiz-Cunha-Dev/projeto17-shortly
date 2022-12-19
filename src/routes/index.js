import { Router } from "express";
import authRouter from "./auth.Router.js"
import urlsRouter from "./urls.Router.js"
import usersRouter from "./users.Router.js"
import rankingRouter from "./ranking.Router.js"

const router = Router();

router.use(authRouter);
router.use(urlsRouter);
router.use(usersRouter);
router.use(rankingRouter);

export default router;
