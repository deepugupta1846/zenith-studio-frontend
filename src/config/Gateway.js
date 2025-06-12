import AuthService from "./auth/AuthService";
import Axios from "axios";
const SERVER_URL = import.meta.env.VITE_API_URL;

const Gateway = {
  request: (url, method, data) => {
    return new Promise((resolve, reject) => {
      Axios({
        method: method,
        url: SERVER_URL + url,
        data: data,
        headers: Gateway.getHeaders(),
      }).then(
        (response) => {
          switch (response.status) {
            case 200:
              resolve(response.data);
              break;
            case 201:
              resolve(response.data);
              break;
            case 202:
              resolve(response.data);
              break;
            case 204:
              resolve();
              break;
            case 401:
              // AuthService.logoutUser();
              // window.location.reload();
              break;
            case 400:
              resolve();
              break;
            case 500:
              resolve();
              break;
            default:
              reject(response.data);
              break;
          }
        },
        (res) => {
          switch (res.response.status) {
            case 401:
              AuthService.logoutUser();
              // TODO differentiate between auth request and other request
              // window.location.reload();
              reject(res);
              break;
            default:
              reject(res.response.data);
              break;
          }
          // const erro = {error: "Error occured", response: erro};
          reject(res.response.data);
        }
      );
    });
  },

  getHeaders: () => {
    const headersObj = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };
    if (AuthService.getAuthToken()) {
      headersObj.Authorization = "Token " + AuthService.getAuthToken();
    }
    console.log(headersObj)
    return headersObj;
  },

  getBearerHeaders: (token) => {
    const headersObj = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };
    if (token) {
      headersObj.Authorization = "bearer " + token;
    }
    return headersObj;
  },
};

export default Gateway;
