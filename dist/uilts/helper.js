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
exports.DataTransformerHelper = exports.EncryptHelper = void 0;
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
class DataTransformerHelper {
    static transformData(data) {
        // Step 1: Group data by appName using a Map
        const groupedByAppName = DataTransformerHelper.groupByAppName(data);
        // Step 2: Transform grouped data into the desired format
        return Array.from(groupedByAppName, ([appName, items]) => {
            // Group by platform and aggregate links using Map
            const groupedByPlatform = DataTransformerHelper.groupByPlatform(items);
            // Convert Map to array format
            const informations = Array.from(groupedByPlatform, ([platform, linksSet]) => {
                // Map each link to include convertName if present
                const links = Array.from(linksSet, (link) => {
                    if (typeof link === "string") {
                        return link; // If it's a plain string, return as is
                    }
                    else {
                        return { link: link.link, convertName: link.convertName || "" };
                    }
                });
                return {
                    platform,
                    links,
                };
            });
            return {
                appName,
                informations,
            };
        });
    }
    static transformDataByPlatform(data) {
        // Step 1: Group data by platform using a Map directly
        const groupedByPlatform = DataTransformerHelper.groupByPlatform(data);
        // Step 2: Convert Map to array format
        return Array.from(groupedByPlatform, ([platform, linksSet]) => {
            // Extract links from Set, map to desired structure
            const links = Array.from(linksSet, (link) => {
                if (typeof link === "string") {
                    return link; // If it's a plain string, return as is
                }
                else {
                    return { link: link.link, convertName: link.convertName || "" }; // If it's an object, include convertName
                }
            });
            return {
                platform,
                links,
            };
        });
    }
    static groupByPlatform(data) {
        var _a;
        const groupedMap = new Map();
        for (const item of data) {
            const { platform, link, convertName } = item;
            const entry = convertName
                ? { link, convertName }
                : link;
            if (groupedMap.has(platform)) {
                (_a = groupedMap.get(platform)) === null || _a === void 0 ? void 0 : _a.add(entry);
            }
            else {
                groupedMap.set(platform, new Set([entry]));
            }
        }
        return groupedMap;
    }
    static groupByAppName(data) {
        return data.reduce((acc, item) => {
            const key = item.appName;
            if (!acc.has(key)) {
                acc.set(key, []);
            }
            acc.get(key).push(item);
            return acc;
        }, new Map());
    }
}
exports.DataTransformerHelper = DataTransformerHelper;
//# sourceMappingURL=helper.js.map