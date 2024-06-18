"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptHelper = void 0;
const variables_1 = require("./variables");
const bcrypt = __importStar(require("bcryptjs"));
/**
 * The encrypt helper will use to encrypt the token and decrypt the token
 */
class EncryptHelper {
}
exports.EncryptHelper = EncryptHelper;
/**
 * Enrypt token
 * @param token -> Token string need to be encrypted
 * @returns string
 */
EncryptHelper.encryptToken = (token) => {
    return Buffer.from(token, "utf8").toString("base64");
};
/**
 * Decrypt token
 * @param token -> Token string need to be decrypted
 * @returns string
 */
EncryptHelper.decryptToken = (token) => {
    return Buffer.from(token, "base64").toString("utf8");
};
/**
 * Decrypt token
 * @param token -> Token string need to be decrypted
 * @returns string
 */
EncryptHelper.bcryptHash = (password) => {
    return bcrypt.hash(password, variables_1.Variables.SALT_ROUNDS);
};
//# sourceMappingURL=helper.js.map