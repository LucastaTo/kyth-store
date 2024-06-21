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
const Logging_1 = __importDefault(require("../library/Logging"));
const http_code_1 = require("../uilts/http-code");
const helper_1 = require("../uilts/helper");
const variables_1 = require("../uilts/variables");
const renderOverviewPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let socialMedias = yield SocialMedia_1.default.find({
            platform: variables_1.Variables.APPNAME,
        })
            .sort({
            order: 1,
        })
            .exec();
        if ((socialMedias === null || socialMedias === void 0 ? void 0 : socialMedias.length) === 0) {
            socialMedias = variables_1.Variables.DATA_DEFAULT;
        }
        const data = helper_1.DataTransformerHelper.transformDataByPlatform(socialMedias.filter((i) => i.appName === variables_1.Variables.APPNAME));
        res.render("overview/index", { data });
    }
    catch (error) {
        Logging_1.default.error(error);
        res.status(http_code_1.HttpCode.BAD_REQUEST).render("pages-500/index");
    }
});
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
    const { platform, link, appName, convertName = "" } = req.body;
    try {
        const lastSocialMedia = yield SocialMedia_1.default.findOne({ appName }).sort({
            order: -1,
        });
        const nextOrder = lastSocialMedia ? lastSocialMedia.order + 1 : 1;
        const newSocialMedia = new SocialMedia_1.default({
            platform,
            link,
            appName,
            convertName,
            order: nextOrder,
        });
        yield newSocialMedia.save();
        res.status(201).json(newSocialMedia);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
const getSocialMediaByAppName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { APP_NAME } = process.env;
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