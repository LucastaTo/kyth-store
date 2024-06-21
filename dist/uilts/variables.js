"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variables = void 0;
class Variables {
}
exports.Variables = Variables;
Variables.APPNAME = process.env.APP_NAME;
Variables.USERNAME = process.env.USERNAME;
Variables.PASSWORD = process.env.PASSWORD;
Variables.LENGTH_MIN_PASSWORD = 8;
Variables.SALT_ROUNDS = 10;
Variables.PAGE = 1;
Variables.ACTIVE = 1;
Variables.INACTIVE = 0;
Variables.ASC = "ASC";
Variables.DESC = "DESC";
Variables.ALL = "ALL";
Variables.REMEMBER_SESSION = (Number(process.env.REMEMBER_TOKEN) || 365 * 24 * 60 * 60) * 1000;
Variables.EXPIRED_SESSION = (Number(process.env.EXPIRED_TOKEN) || 2 * 60 * 60) * 1000;
Variables.TOKEN_LIFETIME = 24 * 60 * 60 * 1000;
Variables.DATA_DEFAULT = [
    {
        appName: Variables.APPNAME,
        platform: "instagram",
        link: "https://www.instagram.com/kyth.studio.vn",
        order: 2,
    },
    {
        appName: Variables.APPNAME,
        platform: "tiktok",
        link: "https://www.tiktok.com/@kyth12.6",
        order: 1,
    },
    {
        appName: Variables.APPNAME,
        platform: "facebook",
        link: "https://www.facebook.com/profile.php?id=100086505662624&mibextid=LQQJ4d",
        convertName: "KYTH Studio",
        order: 3,
    },
    {
        appName: process.env.APP_NAME_SECOND,
        platform: "instagram",
        link: "https://www.instagram.com/kyth.studio.vn",
        order: 1,
    },
    {
        appName: process.env.APP_NAME_SECOND,
        platform: "tiktok",
        link: "https://www.tiktok.com/@kyth12.6",
        order: 2,
    },
    {
        appName: process.env.APP_NAME_SECOND,
        platform: "facebook",
        link: "https://www.facebook.com/profile.php?id=100086505662624&mibextid=LQQJ4d",
        convertName: "KYTH Studio",
        order: 3,
    },
].sort((a, b) => a.order - b.order);
//# sourceMappingURL=variables.js.map