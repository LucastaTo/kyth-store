import { ISocialMedia } from "../models/SocialMedia";
import { Variables } from "./variables";
import * as bcrypt from "bcryptjs";

/**
 * The encrypt helper will use to encrypt the token and decrypt the token
 */
export class EncryptHelper {
  /**
   * Enrypt token
   * @param token -> Token string need to be encrypted
   * @returns string
   */
  public static encryptToken = (token: string): string => {
    return Buffer.from(token, "utf8").toString("base64");
  };

  /**
   * Decrypt token
   * @param token -> Token string need to be decrypted
   * @returns string
   */
  public static decryptToken = (token: string): string => {
    return Buffer.from(token, "base64").toString("utf8");
  };

  /**
   * Decrypt token
   * @param token -> Token string need to be decrypted
   * @returns string
   */
  public static bcryptHash = (password: string): Promise<string> => {
    return bcrypt.hash(password, Variables.SALT_ROUNDS);
  };
}

interface GroupByLink {
  link: string;
  convertName: string;
}

interface GroupedByPlatform {
  platform: string;
  links: (string | GroupByLink)[];
}

interface TransformedData {
  appName: string;
  informations: GroupedByPlatform[];
}

export class DataTransformerHelper {
  public static transformData(data: ISocialMedia[]): TransformedData[] {
    // Step 1: Group data by appName using a Map
    const groupedByAppName = DataTransformerHelper.groupByAppName(data);

    // Step 2: Transform grouped data into the desired format
    return Array.from(groupedByAppName, ([appName, items]) => {
      // Group by platform and aggregate links using Map
      const groupedByPlatform = DataTransformerHelper.groupByPlatform(items);

      // Convert Map to array format
      const informations: GroupedByPlatform[] = Array.from(
        groupedByPlatform,
        ([platform, linksSet]) => {
          // Map each link to include convertName if present
          const links = Array.from(linksSet, (link) => {
            if (typeof link === "string") {
              return link; // If it's a plain string, return as is
            } else {
              return { link: link.link, convertName: link.convertName || "" };
            }
          });

          return {
            platform,
            links,
          };
        }
      );

      return {
        appName,
        informations,
      };
    });
  }

  public static transformDataByPlatform(
    data: ISocialMedia[]
  ): GroupedByPlatform[] {
    // Step 1: Group data by platform using a Map directly
    const groupedByPlatform = DataTransformerHelper.groupByPlatform(data);

    // Step 2: Convert Map to array format
    return Array.from(groupedByPlatform, ([platform, linksSet]) => {
      // Extract links from Set, map to desired structure
      const links = Array.from(linksSet, (link) => {
        if (typeof link === "string") {
          return link; // If it's a plain string, return as is
        } else {
          return { link: link.link, convertName: link.convertName || "" }; // If it's an object, include convertName
        }
      });

      return {
        platform,
        links,
      };
    });
  }

  private static groupByPlatform(
    data: ISocialMedia[]
  ): Map<string, Set<string | ISocialMedia>> {
    const groupedMap = new Map<string, Set<string | ISocialMedia>>();
    for (const item of data) {
      const { platform, link, convertName } = item;
      const entry: string | ISocialMedia = convertName
        ? ({ link, convertName } as ISocialMedia)
        : link;

      if (groupedMap.has(platform)) {
        groupedMap.get(platform)?.add(entry);
      } else {
        groupedMap.set(platform, new Set([entry]));
      }
    }
    return groupedMap;
  }

  private static groupByAppName(
    data: ISocialMedia[]
  ): Map<string, ISocialMedia[]> {
    return data.reduce((acc, item) => {
      const key = item.appName;
      if (!acc.has(key)) {
        acc.set(key, []);
      }
      acc.get(key)!.push(item);
      return acc;
    }, new Map<string, ISocialMedia[]>());
  }
}
