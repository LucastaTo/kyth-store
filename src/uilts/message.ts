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
  public static readonly LOGOUT_SUCCESS: string = "Đăng xuất thành công!";

  // Login
  public static readonly INVALID_USER_NAME: string =
    "Xin hãy điền tên đăng nhập!";
  public static readonly INVALID_PASSWORD: string =
    "Vui lòng nhập mật khẩu của bạn!";
  public static readonly INVALID_CREDENTIAL: string =
    "ID đăng nhập hoặc mật khẩu không hợp lệ";
  public static readonly USER_IS_BLOCKED: string =
    "Người dùng hiện tại đã bị chặn";

  // SUCCESSFULLY
  public static readonly CREATED_SUCCESS: string = "Đã được tạo thành công。";
  public static readonly DELETED_SUCCESS: string = "Đã được xoá thành công。";
  public static readonly UPDATED_SUCCESS: string = "Đã được cập nhật thành công。";
}
