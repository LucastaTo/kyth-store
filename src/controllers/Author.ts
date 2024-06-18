import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Author, { IAuthor } from "../models/Author";
import Logging from "../library/Logging";
import { Messages } from "../uilts/message";
import { Variables } from "../uilts/variables";
import { HttpCode } from "../uilts/http-code";
import { EncryptHelper } from "../uilts/helper";

const renderAdminPage = (req: Request, res: Response): void => {
  res.render("dashboard/index", { message: "" });
};

const renderLoginPage = (req: Request, res: Response): void => {
  if ((req.session as any).userName) {
    return res.redirect("/dashboard");
  }

  (req.session as any).userName = "";
  return res.render("authentication/login");
};

// const updateLang = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   const { lang } = req.body;
//   const username = req.session.username;

//   try {
//     const user = await Author.findOneAndUpdate(
//       { username },
//       { lang },
//       { new: true }
//     );
//     if (user) {
//       req.session.lang = lang;
//       res.send("Language updated successfully");
//     } else {
//       res.status(404).send("User not found");
//     }
//   } catch (error) {
//     next(error);
//   }
// };

const loginAuthor = async (req: Request, res: Response) => {
  const { username, password, remember } = req.body;
  let errors = {};
  let expiredSession = Variables.EXPIRED_SESSION;

  // Validate if username and password are set
  if (!username) errors = { ...errors, userName: Messages.INVALID_USER_NAME };

  // Username Validation
  if (!password) errors = { ...errors, password: Messages.INVALID_PASSWORD };

  if (Object.keys(errors).length > 0) {
    return res
      .status(HttpCode.NOT_FOUND)
      .render("authentication/login", { errorValidator: errors, data: req.body });
  }

  if (remember === "on") {
    expiredSession = Variables.REMEMBER_SESSION;
    req.session.cookie.maxAge = Variables.REMEMBER_SESSION;
  }

  try {
    let user: IAuthor | null = await Author.findOne({ username });
    if(Object.keys(user).length === 0) {
      user = {
        isActive: true,
        username: Variables.USERNAME,
        password: Variables.PASSWORD,
        lang: "VN"
      }
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      if (!user.isActive) {
        Logging.error(Messages.LOGIN_FAIL);
        res
          .status(HttpCode.BAD_REQUEST)
          .render("authentication/login", { message: Messages.USER_IS_BLOCKED, data: req.body });
      }
      const accessToken = jwt.sign(
        { username: user.username, lang: user.lang },
        process.env.JWT_SECRET || "default_secret",
        { expiresIn: "1h" }
      );

      Logging.info(Messages.LOGIN_SUCCESS);
      (req.session as any).userName = user.username;
      res
        .cookie("wacts", EncryptHelper.encryptToken(accessToken), {
          maxAge: expiredSession,
        })
        .redirect("/author/dashboard");
    } else {
      Logging.error(Messages.LOGIN_FAIL);
      res.status(HttpCode.BAD_REQUEST).render("authentication/login", { message: Messages.INVALID_CREDENTIAL, data: req.body });
    }
  } catch (error) {
    Logging.error(error);
    res.status(HttpCode.BAD_REQUEST).render("authentication/login", { message: Messages.INVALID_CREDENTIAL });
        
  }
};

const logoutAuthor = async (req: Request, res: Response) => {
  req.session.destroy((error: any) => error);
  return res
    .clearCookie("wacts", { maxAge: 0 })
    .status(HttpCode.SUCCESSFUL)
    .redirect("/author/login");
};

export default {
  loginAuthor,
  renderLoginPage,
  logoutAuthor,
  renderAdminPage,
};
