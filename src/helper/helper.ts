import instance from "../axios_instance/instance";

export const getAllProject = async (accessToken: string) => {
  return await instance.get("/projects", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
