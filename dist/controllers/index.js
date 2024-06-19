"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderComingSoonPage = (_, res) => {
    res.render("coming-soon/index");
};
const renderServerErrorPage = (_, res) => {
    res.render("pages-500/index");
};
exports.default = { renderComingSoonPage, renderServerErrorPage };
//# sourceMappingURL=index.js.map