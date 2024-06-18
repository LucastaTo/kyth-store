export class Variables {
  public static readonly USERNAME: string = process.env.USERNAME;
  public static readonly PASSWORD: string = process.env.PASSWORD;
  public static readonly LENGTH_MIN_PASSWORD: number = 8;
  public static readonly EMAIL_REGEX: any =
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  public static readonly SALT_ROUNDS: number = 10;
  public static readonly UPLOAD_IMAGE_MAX: number = 2 * 1024 * 1024;
  public static readonly PAGE: number = 1;
  public static readonly ACTIVE: number = 1;
  public static readonly INACTIVE: number = 0;
  public static readonly ASC: string = "ASC";
  public static readonly DESC: string = "DESC";
  public static readonly ALL: string = "ALL";
  public static readonly ABSENCE: string = "ABSENCE";
  public static readonly WEEK_AGO = 6;
  public static readonly ONE_WEEK_AGO = 7;
  public static readonly REMEMBER_SESSION: number =
    (Number(process.env.REMEMBER_TOKEN!) || 365 * 24 * 60 * 60) * 1000;
  public static readonly EXPIRED_SESSION: number =
    (Number(process.env.EXPIRED_TOKEN!) || 2 * 60 * 60) * 1000;
  public static readonly TOKEN_LIFETIME = 24 * 60 * 60 * 1000;
}
