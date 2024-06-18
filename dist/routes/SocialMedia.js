"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SocialMedia_1 = __importDefault(require("../controllers/SocialMedia"));
const Joi_1 = require("../middleware/Joi");
const Authentication_1 = require("../middleware/Authentication");
const router = express_1.default.Router();
router.get("*", Authentication_1.checkAppName, SocialMedia_1.default.renderOverviewPage);
router.get("/social-media", Authentication_1.verifyAuthTokenRouter, SocialMedia_1.default.getAllSocialMedia);
router.get("/social-media/appname", Authentication_1.checkAppName, SocialMedia_1.default.getSocialMediaByAppName);
router.post("/social-media", Authentication_1.checkAppName, (0, Joi_1.ValidateJoi)(Joi_1.Schemas.socialMedia.create), SocialMedia_1.default.createSocialMedia);
router.delete("/social-media/:id", Authentication_1.checkAppName, SocialMedia_1.default.deleteSocialMedia);
exports.default = router;
//# sourceMappingURL=SocialMedia.js.map