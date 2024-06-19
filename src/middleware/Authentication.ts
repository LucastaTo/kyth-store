import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HttpCode } from "../uilts/http-code";
import { EncryptHelper } from "../uilts/helper";
import { Variables } from "../uilts/variables";
import Author, { IAuthor } from "../models/Author";
import Logging from "../library/Logging";

/**
 * Check the authentication token when the user visits all pages while logged in
 * Get access_token from cookies
 */
export async function verifyAuthTokenRouter(
  request: Request,
  response: Response,
  next: NextFunction
) {
  let token = request.cookies.wacts;
  let username = (request.session as any).userName;

  if (!token || (!request.cookies.wacts && request.path != "/author/login")) {
    // destroySession(request, response);
  return response
      .clearCookie("wacts", { maxAge: 0 })
      .status(HttpCode.UNAUTHORIZATION)
      .redirect("/author/login");
  }
  
  try {
    let jwtPayload = jwt.verify(
      EncryptHelper.decryptToken(token),
      process.env.SERCRET_KEY!
    ) as {
      username: string;
      lang: string;
      remember: string;
    };

    let refreshUserDecoded: IAuthor | null = await Author.findOne({ username });
 
    if(!refreshUserDecoded) {
      refreshUserDecoded = {
        isActive: true,
        username: Variables.USERNAME,
        password: Variables.PASSWORD,
        lang: "VN"
      }
    }

    if (
      !refreshUserDecoded?.isActive ||
      (username && username !== jwtPayload.username) ||
      username === undefined
    ) {
      if (
        jwtPayload.remember === undefined ||
        (jwtPayload.remember === "on" && !request.session.cookie.expires) ||
        username !== jwtPayload.username
      ) {
        // destroySession(request, response);
        return response
          .clearCookie("wacts", { maxAge: 0 })
          .status(HttpCode.UNAUTHORIZATION)
          .redirect("/author/login");
      }
    }

    if (jwtPayload.remember === "on") {
      response.cookie("wacts", token, { maxAge: Variables.REMEMBER_SESSION });
    } else {
      response.cookie("wacts", token, { maxAge: Variables.EXPIRED_SESSION });
    }

    response.locals.jwtPayload = {
      ...jwtPayload,
      user: refreshUserDecoded,
    };
    return next();
  } catch (err: any) {
    Logging.error(err)
    return response.status(HttpCode.UNAUTHORIZATION).redirect("/author/login");
  }
}

// export async function destroySession(request: Request, response: Response) {
//   let ds = container
//     .get<DataSourceConnection>(TYPES.DataSourceConnect)
//     .getDataSource();
//   let sessionRepository: any = ds?.getRepository("session");
//   const sessionId = request.session.id;
//   await sessionRepository.delete({ id: sessionId });
// }

export const checkAppName = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { APP_NAME } = process.env;

  if (!APP_NAME) {
    Logging.error("Environment variable APP_NAME is not set")
    res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .redirect("/pages-500");
    return;
  }

  next();
};
