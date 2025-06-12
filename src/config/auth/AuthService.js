import CookieHandler from "../CookieHandler";
import Gateway from "../Gateway";

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
          return res;
      },
      (res) => {
        return Promise.reject(res);
      }
    );
  },

  getUserDetails:()=>{
      let url = '/api/auth/profile'
      return Gateway.request(url, "GET")
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
