import { Request, Response } from "express";
import SocialMedia, { ISocialMedia } from "../models/SocialMedia";
import Logging from "../library/Logging";
import { HttpCode } from "../uilts/http-code";
import { DataTransformerHelper } from "../uilts/helper";
import { Variables } from "../uilts/variables";

const renderOverviewPage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let socialMedias: ISocialMedia[] | null = await SocialMedia.find({
      platform: Variables.APPNAME,
    })
      .sort({
        order: 1,
      })
      .exec();

    if (socialMedias?.length === 0) {
      socialMedias = Variables.DATA_DEFAULT as ISocialMedia[];
    }

    const data = DataTransformerHelper.transformDataByPlatform(
      socialMedias.filter((i) => i.appName === Variables.APPNAME)
    );

    res.render("overview/index", { data });
  } catch (error: any) {
    Logging.error(error);
    res.status(HttpCode.BAD_REQUEST).render("pages-500/index");
  }
};

const getAllSocialMedia = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const socialMedias: ISocialMedia[] = await SocialMedia.find();
    res.status(200).json(socialMedias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSocialMedia = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { APP_NAME } = process.env;

  if (!APP_NAME) {
    res
      .status(500)
      .json({ message: "Environment variable APP_NAME is not set" });
    return;
  }
  const { platform, link } = req.body;

  try {
    const newSocialMedia: ISocialMedia = new SocialMedia({ platform, link });
    await newSocialMedia.save();
    res.status(201).json(newSocialMedia);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSocialMediaByAppName = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { APP_NAME } = process.env;

  try {
    const socialMedia: ISocialMedia | null = await SocialMedia.findOne({
      platform: APP_NAME,
    });
    if (!socialMedia) {
      res
        .status(404)
        .json({ message: `Social media for app '${APP_NAME}' not found` });
      return;
    }
    res.status(200).json(socialMedia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSocialMedia = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedSocialMedia: ISocialMedia | null =
      await SocialMedia.findByIdAndDelete(id);
    if (!deletedSocialMedia) {
      res.status(404).json({ message: "Social media not found" });
      return;
    }
    res.status(200).json({ message: "Social media deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getAllSocialMedia,
  createSocialMedia,
  getSocialMediaByAppName,
  deleteSocialMedia,
  renderOverviewPage,
};
