import { baseUrl } from "../url/base-url";

export const signUpRequest = (signUpData) =>  baseUrl.post("/auth/sign-up",signUpData)