import { baseUrl } from "../url/base-url";

export const loginRequest = async (loginData) => {
    try {
      const response = await baseUrl.post("/auth/login", loginData, {
        withCredentials: true,
      });

      const token = response.data?.token;
      if (token) {
        localStorage.setItem("token", token); // Save token for future requests
      }
      console.log(localStorage.getItem("token"))
      console.log(token)
      return token;
    } catch (error) {
      console.error("Login request failed:", error);
      throw error;
    }
  };