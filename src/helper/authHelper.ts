import jsCookie from "js-cookie";
import instance from "../axios_instance/instance";
import { ISignIn, ISignUp } from "../validation/validation";

export const signInHelper = async (payload: ISignIn) => {
  return await instance.post("/sign-in", { ...payload });
};
export const signUpHelper = async (payload: ISignUp) => {
  return await instance.post("/sign-up", { ...payload });
};
export interface IProjectPayload {
  title: string;
  description: string;
  img: File | null;
}
export const addFileHelper = async (
  payload: IProjectPayload,
  accessToken: string
) => {
  return await instance.post(
    "/add-project",
    { ...payload },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
export const removeCookie = () => {
  return jsCookie.remove("user_token");
};
