"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const Logging_1 = __importDefault(require("./library/Logging"));
const Author_1 = __importDefault(require("./routes/Author"));
const SocialMedia_1 = __importDefault(require("./routes/SocialMedia"));
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
/** Connect to Mongo */
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => {
    Logging_1.default.info("Mongo connected successfully.");
    StartServer();
})
    .catch((error) => Logging_1.default.error(error));
/** Start Server */
const StartServer = () => {
    app.use((req, res, next) => {
        /** Log the request */
        Logging_1.default.info(`Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on("finish", () => {
            /** Log the response */
            Logging_1.default.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });
        next();
    });
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use((0, express_session_1.default)({
        secret: process.env.SERCRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    }));
    app.set("view engine", "ejs");
    app.engine("ejs", require("ejs").__express);
    app.set("views", path_1.default.join(__dirname, "views", "pages"));
    app.use(express_1.default.static(path_1.default.join(__dirname, "views", "public")));
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    /** CORS Configuration */
    app.use((0, cors_1.default)());
    app.options("*", (0, cors_1.default)());
    /** Rules of our API */
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
            return res.status(200).json({});
        }
        next();
    });
    /** Routes */
    app.use("/author", Author_1.default);
    app.use("/social-media", SocialMedia_1.default);
    app.use(index_1.default);
    /** Healthcheck */
    app.get("/ping", (req, res) => res.status(200).json({ hello: "world" }));
    /** Error handling */
    app.use((_, __, next) => {
        const error = new Error("Not found"); // Cast to any to access 'status'
        error.status = 404;
        next(error);
    });
    app.use((error, req, res, next) => {
        Logging_1.default.error(error);
        res.status(error.status || 500).json({
            message: error.message,
        });
    });
    /** Start HTTP server */
    http_1.default.createServer(app).listen(config_1.config.server.port, () => {
        Logging_1.default.info(`Server is running on port ${config_1.config.server.port}`);
    });
};
//# sourceMappingURL=index.js.map