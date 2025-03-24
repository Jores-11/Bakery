import { baseUrl } from "../url/base-url";

export const whoAmIRequest = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from storage
        console.log(token)
      if (!token) {
        throw new Error("No token found, user is not authenticated.");
      }
  
    //   console.log("Hello world")
      const response = await baseUrl.get("/auth/whoami", {
        headers: { Authorization: `Bearer ${token}` }, // Attach token
        withCredentials: true,
      });
      console.log(response.headers)
  
      return response.data;
    } catch (error) {
      console.error("WhoAmI request failed:", error);
      throw error;
    }
  };