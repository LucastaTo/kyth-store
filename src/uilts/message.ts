export class Messages {
  public static readonly AUTHENTICATION_FAILED: string =
    "Authentication failed !!!";
  public static readonly AUTHENTICATION_SUCCESSFULLY: string =
    "Authentication successfully.";
  public static readonly UNAUTHORIZED: string = "Unauthorized.";
  public static readonly FORBIDDEN: string = "Forbidden.";

  public static readonly ID_NOT_NULL: string = "ID could not be null !!!";
  public static readonly USERNAME_NOT_EMPTY: string =
    "User name could not null or emtpy";
  public static readonly USER_NOT_FOUND: string = "User not found";
  public static readonly NOT_PROCESS: string = "Not Process";
  public static readonly CAN_NOT_CREATE_USER: string =
    "The system could not create user";
  public static readonly CAN_NOT_CHANGE_PASSWORD: string =
    "The system could not change the password";

  public static readonly REQUIRE_TOKEN: string =
    "A token is required for authentication";
  public static readonly ACCESS_TOKEN_SUCCESS: string = "Access token success!";
  public static readonly INVALID_TOKEN: string = "Invalid Token!";
  public static readonly LOGIN_FAIL: string = "Loggin fail!";
  public static readonly LOGIN_SUCCESS: string = "Loggin success!";
  public static readonly CAN_NOT_GET_ACCESS_TOKEN: string =
    "Can not get access token!";
  public static readonly CAN_NOT_GET_REFRESH_TOKEN: string =
    "Can not get refresh token!";
  public static readonly INVALID_ACCESS_TOKEN: string = "Invalid access token.";
  public static readonly INVALID_REFRESH_TOKEN: string =
    "Invalid refresh token.";
  public static readonly USER_NOT_EXITS: string = "User does not exist.";
  public static readonly GENERATE_TOKEN_FAIL: string =
    "Generate new token fail!";
  public static readonly REFRESH_TOKEN_SUCCESS: string =
    "Refresh token success!";
  public static readonly CAN_NOT_VERIFY_TOKEN: string = "Cannot verify token!";
  public static readonly LOGOUT_SUCCESS: string = "logged out Successfully!";

  // Login
  public static readonly INVALID_USER_NAME: string =
    "ユーザー名を入力してください！";
  public static readonly INVALID_PASSWORD: string =
    "パスワードを入力してください！";
  public static readonly INVALID_CREDENTIAL: string =
    "ログインIDもしくはパスワードが無効です";
  public static readonly USER_IS_BLOCKED: string =
    "現在のユーザーはブロックされています";

  // SIGNUP
  public static readonly PASSWORD_IS_LENGTH: string = "パスワードは 8 文字以上";
  public static readonly INVALID_EMAIL: string =
    "電子メールは必須フィールドです!";
  public static readonly INVALID_FIRST_NAME: string = "名は必須フィールドです!";
  public static readonly INVALID_LAST_NAME: string = "姓は必須フィールドです!";
  public static readonly WRONG_EMAIL_FORMAT: string =
    "電子メールは有効な電子メールである必要があります!";
  public static readonly PASSWORD_NOT_MATCH: string =
    "パスワードが一致する必要があります!";
  public static readonly EMAIL_IS_EXIST: string = "メールは既に存在します!";
  public static readonly USER_NAME_IS_EXIST: string =
    "ユーザー名は既に存在します!";
  public static readonly MAX_ALLOW_AVATAR_SIZE: string =
    "アップロードした画像が 2MB を超えています";
  public static readonly INVALID_FILE: string = "無効なファイル";

  // NG Reg
  public static readonly INVALID_NG_REG: string = "この項目は必須です!";
  public static readonly NG_REG_IS_EXISTS: string = "NGワードは登録済みです!";

  // SUCCESSFULLY
  public static readonly CREATED_SUCCESS: string = "が正常に作成されました。";
  public static readonly DELETED_SUCCESS: string = "が正常に削除されました。";
  public static readonly UPDATED_SUCCESS: string = "が正常に更新されました。";
}
