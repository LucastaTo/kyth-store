"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variables = void 0;
class Variables {
}
exports.Variables = Variables;
Variables.USERNAME = process.env.USERNAME;
Variables.PASSWORD = process.env.PASSWORD;
Variables.LENGTH_MIN_PASSWORD = 8;
Variables.EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
Variables.SALT_ROUNDS = 10;
Variables.UPLOAD_IMAGE_MAX = 2 * 1024 * 1024;
Variables.PAGE = 1;
Variables.ACTIVE = 1;
Variables.INACTIVE = 0;
Variables.ASC = "ASC";
Variables.DESC = "DESC";
Variables.ALL = "ALL";
Variables.ABSENCE = "ABSENCE";
Variables.WEEK_AGO = 6;
Variables.ONE_WEEK_AGO = 7;
Variables.REMEMBER_SESSION = (Number(process.env.REMEMBER_TOKEN) || 365 * 24 * 60 * 60) * 1000;
Variables.EXPIRED_SESSION = (Number(process.env.EXPIRED_TOKEN) || 2 * 60 * 60) * 1000;
Variables.TOKEN_LIFETIME = 24 * 60 * 60 * 1000;
//# sourceMappingURL=variables.js.map