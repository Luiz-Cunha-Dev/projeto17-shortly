import { Router } from "express";
import { shortener, searchUrl, redirect, deleteUrl } from "../controllers/urls.Controller.js";
import urlMiddleware from "../middlewares/url.middleware.js";

const router = Router();

router.post('/urls/shorten', urlMiddleware, shortener);

router.get('/urls/:id', searchUrl);

router.get('/urls/open/:shortUrl', redirect);

router.delete('/urls/:id', deleteUrl);

export default router;