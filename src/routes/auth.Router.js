import { Router } from "express";
import { signup, signin } from "../controllers/auth.Controller.js";
import signupMiddleware from "../middlewares/signup.middleware.js";
import signinMiddleware from "../middlewares/signin.middleware.js";

const router = Router();

router.post('/signup', signupMiddleware, signup);

router.post('/signin', signinMiddleware, signin);

export default router;