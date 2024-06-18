"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SocialMedia_1 = __importDefault(require("../models/SocialMedia"));
const renderOverviewPage = (req, res) => {
    const data = [
        { platform: "instagram", links: ["https://www.instagram.com/kyth.studio.vn"] },
        { platform: "tiktok", links: ["https://www.tiktok.com/@kyth12.6"] },
        { platform: "facebook", links: ["https://www.facebook.com/profile.php?id=100086505662624&mibextid=LQQJ4d"] }
    ];
    res.render("overview/index", { data });
};
const getAllSocialMedia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const socialMedias = yield SocialMedia_1.default.find();
        res.status(200).json(socialMedias);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const createSocialMedia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { APP_NAME } = process.env;
    if (!APP_NAME) {
        res
            .status(500)
            .json({ message: "Environment variable APP_NAME is not set" });
        return;
    }
    const { platform, link } = req.body;
    try {
        const newSocialMedia = new SocialMedia_1.default({ platform, link });
        yield newSocialMedia.save();
        res.status(201).json(newSocialMedia);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
const getSocialMediaByAppName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { APP_NAME } = process.env;
    if (!APP_NAME) {
        res
            .status(500)
            .json({ message: "Environment variable APP_NAME is not set" });
        return;
    }
    try {
        const socialMedia = yield SocialMedia_1.default.findOne({
            platform: APP_NAME,
        });
        if (!socialMedia) {
            res
                .status(404)
                .json({ message: `Social media for app '${APP_NAME}' not found` });
            return;
        }
        res.status(200).json(socialMedia);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const deleteSocialMedia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedSocialMedia = yield SocialMedia_1.default.findByIdAndDelete(id);
        if (!deletedSocialMedia) {
            res.status(404).json({ message: "Social media not found" });
            return;
        }
        res.status(200).json({ message: "Social media deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = {
    getAllSocialMedia,
    createSocialMedia,
    getSocialMediaByAppName,
    deleteSocialMedia,
    renderOverviewPage,
};
//# sourceMappingURL=SocialMedia.js.map