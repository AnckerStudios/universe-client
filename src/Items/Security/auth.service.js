import axios from "axios";
const API_URL = "http://localhost:8080/api/auth/";
const register = (username, password) => {
  return axios.post(API_URL + "signup", {
    username,
    password,
  });
};
const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
        console.log("respon = "+response.data.token)
        if (response.data.token) {
            console.log("token = "+JSON.stringify(response.data))
            localStorage.setItem("user", JSON.stringify(response.data));
        }else{
            console.log("bll")
        }
        return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};
export default AuthService;