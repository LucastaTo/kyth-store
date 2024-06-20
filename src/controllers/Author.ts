import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Author, { IAuthor } from "../models/Author";
import SocialMedia, { ISocialMedia } from "../models/SocialMedia";
import Logging from "../library/Logging";
import { Messages } from "../uilts/message";
import { Variables } from "../uilts/variables";
import { HttpCode } from "../uilts/http-code";
import { DataTransformerHelper, EncryptHelper } from "../uilts/helper";

interface GroupedByPlatform {
  platform: string;
  links: string[];
}

interface TransformedData {
  appName: string;
  informations: GroupedByPlatform[];
}

const renderAdminPage = async (_: Request, res: Response): Promise<void> => {
  let socialMedias: ISocialMedia[] = await SocialMedia.find()
    .sort({
      order: 1,
    })
    .exec();

  if (socialMedias.length === 0) {
    socialMedias = Variables.DATA_DEFAULT as ISocialMedia[];
  }

  const data = DataTransformerHelper.transformData(socialMedias);
  res.render("dashboard/index", { data });
};

const renderLoginPage = (req: Request, res: Response): void => {
  if ((req.session as any).userName) {
    return res.redirect("/author/dashboard");
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
    return res.status(HttpCode.NOT_FOUND).render("authentication/login", {
      errorValidator: errors,
      data: req.body,
    });
  }

  if (remember === "on") {
    expiredSession = Variables.REMEMBER_SESSION;
    req.session.cookie.maxAge = Variables.REMEMBER_SESSION;
  }

  try {
    let user: IAuthor | null = await Author.findOne({ username });
    if (!user) {
      user = {
        isActive: true,
        username: Variables.USERNAME,
        password: Variables.PASSWORD,
        lang: "VN",
      };
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      if (!user.isActive) {
        Logging.error(Messages.LOGIN_FAIL);
        res.status(HttpCode.BAD_REQUEST).render("authentication/login", {
          message: Messages.USER_IS_BLOCKED,
          data: req.body,
        });
      }
      const accessToken = jwt.sign(
        { username: user.username, lang: user.lang, remember: remember },
        process.env.SERCRET_KEY,
        { expiresIn: `${process.env.REMEMBER_TOKEN!}s` }
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
      res.status(HttpCode.BAD_REQUEST).render("authentication/login", {
        message: Messages.INVALID_CREDENTIAL,
        data: req.body,
      });
    }
  } catch (error) {
    Logging.error(error);
    res
      .status(HttpCode.BAD_REQUEST)
      .render("authentication/login", { message: Messages.INVALID_CREDENTIAL });
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
