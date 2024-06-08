import { Router } from "express";
import { agentMethod } from "../controllers/agent.controller.js";

const router = Router();

router.get("/login", agentMethod.login);
router.get("/dashboard", agentMethod.dashboard);

export default router;
