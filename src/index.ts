import express, { Request, Response, NextFunction } from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";
import authorRoutes from "./routes/Author";
import socialMediaRoutes from "./routes/SocialMedia";
import indexRoutes from "./routes/index";
import cors from "cors";
import session from "express-session";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

/** Connect to Mongo */
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logging.info("Mongo connected successfully.");
    StartServer();
  })
  .catch((error) => Logging.error(error));

/** Start Server */
const StartServer = () => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    /** Log the request */
    Logging.info(
      `Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      /** Log the response */
      Logging.info(
        `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
      );
    });

    next();
  });
  app.use(cookieParser());

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(
    session({
      secret: process.env.SERCRET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    })
  );
  app.set("view engine", "ejs");
  app.engine("ejs", require("ejs").__express);

  app.set("views", path.join(__dirname, "views", "pages"));
  app.use(express.static(path.join(__dirname, "views", "public")));

  app.use(bodyParser.urlencoded({ extended: true }));

  /** CORS Configuration */
  app.use(cors());
  app.options("*", cors());

  /** Rules of our API */
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }

    next();
  });

  /** Routes */
  app.use("/author", authorRoutes);
  app.use("/social-media", socialMediaRoutes);
  app.use(indexRoutes);

  /** Healthcheck */
  app.get("/ping", (req: Request, res: Response) =>
    res.status(200).json({ hello: "world" })
  );

  /** Error handling */
  app.use((_: Request, __: Response, next: NextFunction) => {
    const error = new Error("Not found") as any; // Cast to any to access 'status'
    error.status = 404;
    next(error);
  });

  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    Logging.error(error);

    res.status(error.status || 500).json({
      message: error.message,
    });
  });

  /** Start HTTP server */
  http.createServer(app).listen(config.server.port, () => {
    Logging.info(`Server is running on port ${config.server.port}`);
  });
};
