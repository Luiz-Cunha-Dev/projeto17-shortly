import { Router } from "express";
import { getUserData } from "../controllers/users.Controller.js";

const router = Router();

router.get('/users/me', getUserData);

export default router;