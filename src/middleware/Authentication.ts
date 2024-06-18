import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { HttpCode } from "../uilts/http-code";
import { EncryptHelper } from "../uilts/helper";
import { Variables } from "../uilts/variables";
import Author, { IAuthor } from "../models/Author";

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
      process.env.TOKEN_KEY!
    ) as {
      username: string;
      lang: string;
      remember: string;
    };

    let refreshUserDecoded: IAuthor | null = await Author.findOne({ username });

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
      defaultLanguage: process.env.DEFAULT_LANGUAGE || "ja",
    };
    return next();
  } catch (err: any) {
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
    res
      .status(500)
      .json({ message: "Environment variable APP_NAME is not set" });
    return;
  }

  next();
};
