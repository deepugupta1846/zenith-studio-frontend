import CookieHandler from "../CookieHandler";
import Gateway from "../Gateway";
const SERVER_URL = "http://localhost:5000"

const AuthService = {
  signUpUser: (data) => {
    return Gateway.request("/api/auth/register", "POST", data);
  },

  activateUser: (token) => {
    const data = {
      activation_token: token,
    };

    return Gateway.request("/api/v1/activate/", "PUT", data);
  },
  loginUser: (data) => {
    AuthService.logoutUser();
    return Gateway.request("/api/auth/login", "POST", data).then(
      (res) => {
        const token = res.token;
        if (token) {
          AuthService.setAuthToken(token);
          return res;
        }
      },
      (res) => {
        return Promise.reject(res);
      }
    );
  },

  getAuthToken: () => {
    return CookieHandler.getCookie("zenith");
  },
  setAuthToken: (token) => {
    CookieHandler.setCookie("zenith", token);
  },

  logoutUser: () => {
    AuthService.setIsVirtualClass(false);
    CookieHandler.eraseCookie("zenith");
  },
};

export default AuthService;
