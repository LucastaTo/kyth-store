import express from "express";
import controller from "../controllers/Author";
import { verifyAuthTokenRouter } from "../middleware/Authentication";

const router = express.Router();

router.post("/login", controller.loginAuthor);
router.post("/logout", controller.logoutAuthor);
// View
router.get("/dashboard", verifyAuthTokenRouter, controller.renderAdminPage);
router.get("/login", controller.renderLoginPage);

export = router;
