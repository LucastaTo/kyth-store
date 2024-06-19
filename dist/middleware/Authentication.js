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
exports.checkAppName = exports.verifyAuthTokenRouter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_code_1 = require("../uilts/http-code");
const helper_1 = require("../uilts/helper");
const variables_1 = require("../uilts/variables");
const Author_1 = __importDefault(require("../models/Author"));
const Logging_1 = __importDefault(require("../library/Logging"));
/**
 * Check the authentication token when the user visits all pages while logged in
 * Get access_token from cookies
 */
function verifyAuthTokenRouter(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let token = request.cookies.wacts;
        let username = request.session.userName;
        if (!token || (!request.cookies.wacts && request.path != "/author/login")) {
            // destroySession(request, response);
            return response
                .clearCookie("wacts", { maxAge: 0 })
                .status(http_code_1.HttpCode.UNAUTHORIZATION)
                .redirect("/author/login");
        }
        try {
            let jwtPayload = jsonwebtoken_1.default.verify(helper_1.EncryptHelper.decryptToken(token), process.env.SERCRET_KEY);
            let refreshUserDecoded = yield Author_1.default.findOne({ username });
            if (!refreshUserDecoded) {
                refreshUserDecoded = {
                    isActive: true,
                    username: variables_1.Variables.USERNAME,
                    password: variables_1.Variables.PASSWORD,
                    lang: "VN"
                };
            }
            if (!(refreshUserDecoded === null || refreshUserDecoded === void 0 ? void 0 : refreshUserDecoded.isActive) ||
                (username && username !== jwtPayload.username) ||
                username === undefined) {
                if (jwtPayload.remember === undefined ||
                    (jwtPayload.remember === "on" && !request.session.cookie.expires) ||
                    username !== jwtPayload.username) {
                    // destroySession(request, response);
                    return response
                        .clearCookie("wacts", { maxAge: 0 })
                        .status(http_code_1.HttpCode.UNAUTHORIZATION)
                        .redirect("/author/login");
                }
            }
            if (jwtPayload.remember === "on") {
                response.cookie("wacts", token, { maxAge: variables_1.Variables.REMEMBER_SESSION });
            }
            else {
                response.cookie("wacts", token, { maxAge: variables_1.Variables.EXPIRED_SESSION });
            }
            response.locals.jwtPayload = Object.assign(Object.assign({}, jwtPayload), { user: refreshUserDecoded });
            return next();
        }
        catch (err) {
            Logging_1.default.error(err);
            return response.status(http_code_1.HttpCode.UNAUTHORIZATION).redirect("/author/login");
        }
    });
}
exports.verifyAuthTokenRouter = verifyAuthTokenRouter;
// export async function destroySession(request: Request, response: Response) {
//   let ds = container
//     .get<DataSourceConnection>(TYPES.DataSourceConnect)
//     .getDataSource();
//   let sessionRepository: any = ds?.getRepository("session");
//   const sessionId = request.session.id;
//   await sessionRepository.delete({ id: sessionId });
// }
const checkAppName = (req, res, next) => {
    const { APP_NAME } = process.env;
    if (!APP_NAME) {
        res
            .status(500)
            .json({ message: "Environment variable APP_NAME is not set" });
        return;
    }
    next();
};
exports.checkAppName = checkAppName;
//# sourceMappingURL=Authentication.js.map