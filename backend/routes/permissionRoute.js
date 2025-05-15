import { Router } from "express";
import { getPermissionsByUsername, getPermissionsByUserId, updatePermissions } from "../controllers/permissionController.js";

const router = Router();

router.get("/:username", getPermissionsByUsername);

router.get("/", getPermissionsByUserId);

router.put("/", updatePermissions);

export default router;