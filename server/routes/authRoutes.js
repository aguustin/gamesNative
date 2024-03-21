import { Router } from "express";
import { signInController, loginController, checkHttpRequest, changeProfileController, changeNLController, changeUsernameController, changePasswordController } from "../controllers/users.controller.js";

const router = Router();

router.post('/signIn', signInController);

router.post('/login', loginController);

router.get('/allUsers', checkHttpRequest);

router.put('/change-profile/:userId/:fileUri', changeProfileController);

router.put('/change-nl/:userId/:name/:lastname', changeNLController);

router.put('/change-username/:userId/:username', changeUsernameController);

router.put('/change-password/:userId/:oldPassword/:newPassword/:confirmNewPassword', changePasswordController);

export default router;