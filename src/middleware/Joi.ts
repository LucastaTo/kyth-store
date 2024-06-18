import Joi, { ObjectSchema, object } from "joi";
import { NextFunction, Request, Response } from "express";
import Logging from "../library/Logging";
import { ISocialMedia } from "../models/SocialMedia";

export const ValidateJoi = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      Logging.error(error);

      return res.status(422).json({ error });
    }
  };
};

export const Schemas = {
  socialMedia: {
    create: Joi.object<ISocialMedia>({
      appName: Joi.string().required(),
      platform: Joi.string().required(),
      link: Joi.string().uri().required(),
    }),
    update: Joi.object<Partial<ISocialMedia>>({
      platform: Joi.string(),
      link: Joi.string().uri(),
    }),
  },
};
