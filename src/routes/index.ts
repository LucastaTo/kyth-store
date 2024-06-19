// routes/index.ts
import express from "express";
import { checkAppName, verifyAuthTokenRouter } from "../middleware/Authentication";
import controller from "../controllers/SocialMedia";
import homeController from "../controllers/index";

const router = express.Router();

router.get("/pages-500", checkAppName, homeController.renderServerErrorPage);
router.get("/coming-soon", verifyAuthTokenRouter, homeController.renderComingSoonPage);
router.get("*", checkAppName, controller.renderOverviewPage);

export default router;
