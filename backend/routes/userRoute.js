import { registerUser, getUserProfile, updateEmailUsername, updatePassword, loginUser, logoutUser, getTotalUsers} from '../controllers/userController.js';
import { Router } from "express";
const router = Router();

router.post("/register",  registerUser);

router.get("/profile", getUserProfile);

router.get("/count", getTotalUsers);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.put("/profile", updateEmailUsername);

router.put("/profile/password", updatePassword);

export default router;
