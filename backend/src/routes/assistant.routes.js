import { Router } from "express";
import { inactiveUser } from '../controllers/assistant.controller.js';

const router = Router();

router.post("/inactive", inactiveUser);

export default router;