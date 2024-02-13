import instance from "../axios_instance/instance";

export const getAllProject = async (accessToken: string) => {
  return await instance.get("/projects", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
export const allClients = async (accessToken: string) => {
  return await instance.get("/all-clients", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};