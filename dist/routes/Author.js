"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Author_1 = __importDefault(require("../controllers/Author"));
const Authentication_1 = require("../middleware/Authentication");
const router = express_1.default.Router();
router.post("/login", Author_1.default.loginAuthor);
router.post("/logout", Author_1.default.logoutAuthor);
// View
router.get("/dashboard", Authentication_1.verifyAuthTokenRouter, Author_1.default.renderAdminPage);
router.get("/login", Author_1.default.renderLoginPage);
module.exports = router;
//# sourceMappingURL=Author.js.map