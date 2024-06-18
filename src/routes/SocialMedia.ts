import express from "express";
import controller from "../controllers/SocialMedia";
import { Schemas, ValidateJoi } from "../middleware/Joi";
import {
  checkAppName,
  verifyAuthTokenRouter,
} from "../middleware/Authentication";

const router = express.Router();

router.get("*", checkAppName, controller.renderOverviewPage);
router.get(
  "/social-media",
  verifyAuthTokenRouter,
  controller.getAllSocialMedia
);
router.get(
  "/social-media/appname",
  checkAppName,
  controller.getSocialMediaByAppName
);
router.post(
  "/social-media",
  checkAppName,
  ValidateJoi(Schemas.socialMedia.create),
  controller.createSocialMedia
);
router.delete("/social-media/:id", checkAppName, controller.deleteSocialMedia);

export default router;
