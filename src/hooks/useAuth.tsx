import jsCookie from "js-cookie";
import { useEffect, useState } from "react";
import instance from "../axios_instance/instance";
import {
  setAccessToken,
  setIsAuthenticate,
  setUser,
} from "../redux/slice/authSlice";
import { useAppDispatch } from "./hooks";

function useAuth() {
  const [loading, setLoading] = useState(false);
  const disPatch = useAppDispatch();

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const { data, status } = await instance.get("/verify-user");
        // console.log(data)
        if (status !== 200) throw new Error("throw error..!");
        const expirationTime = new Date(
          new Date().getTime() + 1 * 60 * 60 * 1000
        ); // 1 hour from now
        jsCookie.set("user_token", data?.accessToken, {
          expires: expirationTime,
          secure: true,
        });
        disPatch(setUser(data?.client));
        disPatch(setAccessToken(data?.accessToken));
        disPatch(setIsAuthenticate(true));
      } catch (error) {
        disPatch(setUser(null));
        disPatch(setAccessToken(""));
        disPatch(setIsAuthenticate(false));
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return { loading };
}

export default useAuth;
