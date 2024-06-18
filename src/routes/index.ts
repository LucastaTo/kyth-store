// routes/index.ts
import express from "express";
import { checkAppName } from "../middleware/Authentication";
import controller from "../controllers/SocialMedia";

const router = express.Router();

router.get("*", checkAppName, controller.renderOverviewPage);

export default router;
