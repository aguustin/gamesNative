import { Router } from "express";
import { signInController, loginController, checkHttpRequest } from "../controllers/users.controller.js";

const router = Router();

router.post('/signIn', signInController);

router.post('/login', loginController);

router.get('/allUsers', checkHttpRequest);

export default router;