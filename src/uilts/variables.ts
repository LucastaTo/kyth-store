export class Variables {
  public static readonly APPNAME: string = process.env.APP_NAME;
  public static readonly USERNAME: string = process.env.USERNAME;
  public static readonly PASSWORD: string = process.env.PASSWORD;
  public static readonly LENGTH_MIN_PASSWORD: number = 8;
  public static readonly SALT_ROUNDS: number = 10;
  public static readonly PAGE: number = 1;
  public static readonly ACTIVE: number = 1;
  public static readonly INACTIVE: number = 0;
  public static readonly ASC: string = "ASC";
  public static readonly DESC: string = "DESC";
  public static readonly ALL: string = "ALL";
  public static readonly REMEMBER_SESSION: number =
    (Number(process.env.REMEMBER_TOKEN!) || 365 * 24 * 60 * 60) * 1000;
  public static readonly EXPIRED_SESSION: number =
    (Number(process.env.EXPIRED_TOKEN!) || 2 * 60 * 60) * 1000;
  public static readonly TOKEN_LIFETIME = 24 * 60 * 60 * 1000;

  public static readonly DATA_DEFAULT = [
    {
      appName: Variables.APPNAME,
      platform: "instagram",
      link: "https://www.instagram.com/kyth.studio.vn",
      order: 2,
    },
    {
      appName: Variables.APPNAME,
      platform: "tiktok",
      link: "https://www.tiktok.com/@kyth12.6",
      order: 1,
    },
    {
      appName: Variables.APPNAME,
      platform: "facebook",
      link: "https://www.facebook.com/profile.php?id=100086505662624&mibextid=LQQJ4d",
      convertName: "KYTH Studio",
      order: 3,
    },
    {
      appName: process.env.APP_NAME_SECOND,
      platform: "instagram",
      link: "https://www.instagram.com/kyth.studio.vn",
      order: 1,
    },
    {
      appName: process.env.APP_NAME_SECOND,
      platform: "tiktok",
      link: "https://www.tiktok.com/@kyth12.6",
      order: 2,
    },
    {
      appName: process.env.APP_NAME_SECOND,
      platform: "facebook",
      link: "https://www.facebook.com/profile.php?id=100086505662624&mibextid=LQQJ4d",
      convertName: "KYTH Studio",
      order: 3,
    },
  ];
}
