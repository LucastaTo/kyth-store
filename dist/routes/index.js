"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/index.ts
const express_1 = __importDefault(require("express"));
const Authentication_1 = require("../middleware/Authentication");
const SocialMedia_1 = __importDefault(require("../controllers/SocialMedia"));
const router = express_1.default.Router();
router.get("*", Authentication_1.checkAppName, SocialMedia_1.default.renderOverviewPage);
exports.default = router;
//# sourceMappingURL=index.js.map