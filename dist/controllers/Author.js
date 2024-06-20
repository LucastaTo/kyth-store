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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Author_1 = __importDefault(require("../models/Author"));
const SocialMedia_1 = __importDefault(require("../models/SocialMedia"));
const Logging_1 = __importDefault(require("../library/Logging"));
const message_1 = require("../uilts/message");
const variables_1 = require("../uilts/variables");
const http_code_1 = require("../uilts/http-code");
const helper_1 = require("../uilts/helper");
const renderAdminPage = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    let socialMedias = yield SocialMedia_1.default.find()
        .sort({
        order: 1,
    })
        .exec();
    if (socialMedias.length === 0) {
        socialMedias = variables_1.Variables.DATA_DEFAULT;
    }
    const data = helper_1.DataTransformerHelper.transformData(socialMedias);
    res.render("dashboard/index", { data });
});
const renderLoginPage = (req, res) => {
    if (req.session.userName) {
        return res.redirect("/author/dashboard");
    }
    req.session.userName = "";
    return res.render("authentication/login");
};
// const updateLang = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   const { lang } = req.body;
//   const username = req.session.username;
//   try {
//     const user = await Author.findOneAndUpdate(
//       { username },
//       { lang },
//       { new: true }
//     );
//     if (user) {
//       req.session.lang = lang;
//       res.send("Language updated successfully");
//     } else {
//       res.status(404).send("User not found");
//     }
//   } catch (error) {
//     next(error);
//   }
// };
const loginAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, remember } = req.body;
    let errors = {};
    let expiredSession = variables_1.Variables.EXPIRED_SESSION;
    // Validate if username and password are set
    if (!username)
        errors = Object.assign(Object.assign({}, errors), { userName: message_1.Messages.INVALID_USER_NAME });
    // Username Validation
    if (!password)
        errors = Object.assign(Object.assign({}, errors), { password: message_1.Messages.INVALID_PASSWORD });
    if (Object.keys(errors).length > 0) {
        return res.status(http_code_1.HttpCode.NOT_FOUND).render("authentication/login", {
            errorValidator: errors,
            data: req.body,
        });
    }
    if (remember === "on") {
        expiredSession = variables_1.Variables.REMEMBER_SESSION;
        req.session.cookie.maxAge = variables_1.Variables.REMEMBER_SESSION;
    }
    try {
        let user = yield Author_1.default.findOne({ username });
        if (!user) {
            user = {
                isActive: true,
                username: variables_1.Variables.USERNAME,
                password: variables_1.Variables.PASSWORD,
                lang: "VN",
            };
        }
        if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
            if (!user.isActive) {
                Logging_1.default.error(message_1.Messages.LOGIN_FAIL);
                res.status(http_code_1.HttpCode.BAD_REQUEST).render("authentication/login", {
                    message: message_1.Messages.USER_IS_BLOCKED,
                    data: req.body,
                });
            }
            const accessToken = jsonwebtoken_1.default.sign({ username: user.username, lang: user.lang, remember: remember }, process.env.SERCRET_KEY, { expiresIn: `${process.env.REMEMBER_TOKEN}s` });
            Logging_1.default.info(message_1.Messages.LOGIN_SUCCESS);
            req.session.userName = user.username;
            res
                .cookie("wacts", helper_1.EncryptHelper.encryptToken(accessToken), {
                maxAge: expiredSession,
            })
                .redirect("/author/dashboard");
        }
        else {
            Logging_1.default.error(message_1.Messages.LOGIN_FAIL);
            res.status(http_code_1.HttpCode.BAD_REQUEST).render("authentication/login", {
                message: message_1.Messages.INVALID_CREDENTIAL,
                data: req.body,
            });
        }
    }
    catch (error) {
        Logging_1.default.error(error);
        res
            .status(http_code_1.HttpCode.BAD_REQUEST)
            .render("authentication/login", { message: message_1.Messages.INVALID_CREDENTIAL });
    }
});
const logoutAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.destroy((error) => error);
    return res
        .clearCookie("wacts", { maxAge: 0 })
        .status(http_code_1.HttpCode.SUCCESSFUL)
        .redirect("/author/login");
});
exports.default = {
    loginAuthor,
    renderLoginPage,
    logoutAuthor,
    renderAdminPage,
};
//# sourceMappingURL=Author.js.map