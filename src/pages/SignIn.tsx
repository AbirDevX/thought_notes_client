/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import jsCookies from "js-cookie";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { signInHelper } from "../helper/authHelper";
import { useAppDispatch } from "../hooks/hooks";
import {
  setAccessToken,
  setIsAuthenticate,
  setUser,
} from "../redux/slice/authSlice";
import { singInValidation } from "../validation/validation";

function SignIn() {
  const dispatch = useAppDispatch();
  const [fromData, setFromData] = useState({ userName: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiErrors, setApiErrors] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFromData({ ...fromData, [name]: value });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const errors = singInValidation(fromData);
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }
      const { data, status } = await signInHelper(fromData);
      if (status !== 200) throw new Error("Unauthorized..!");

      dispatch(setAccessToken(data?.accessToken));
      dispatch(setIsAuthenticate(true));
      dispatch(setUser(data?.client));
      const expirationTime = new Date(
        new Date().getTime() + 1 * 60 * 60 * 1000
      ); // 1 hour from now
      jsCookies.set("user_token", data?.accessToken, {
        expires: expirationTime,
        secure: true,
      });
      toast.success("sing successfully.");
      // setFromData({ userName: "", password: "" });
    } catch (error: any) {
      console.log(error);
      const apiError: AxiosError = error;
      setApiErrors(apiError.response?.data?.errors?.message);
      toast.error("Failed to sign in!");
    }
  };

  return (
    <main className="mt-0 transition-all duration-200 ease-soft-in-out">
      <section>
        <div className="relative flex items-center p-0 overflow-hidden bg-center bg-cover min-h-75-screen">
          <div className="container z-10">
            <div className="flex flex-wrap mt-0 -mx-3">
              <div className="flex flex-col w-full max-w-full px-3 mx-auto md:flex-0 shrink-0 md:w-6/12 lg:w-5/12 xl:w-4/12">
                <div className="relative flex flex-col min-w-0 mt-32 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
                  <div className="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl">
                    <h3 className="relative z-10 font-bold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text">
                      Welcome back
                    </h3>
                    <p className="mb-0">
                      Enter your Username and password to sign in
                    </p>
                  </div>
                  <div className="flex-auto p-6">
                    <form role="form" onSubmit={handleSubmit}>
                      <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
                        UserName
                      </label>
                      <div className="mb-4">
                        <input
                          type="text"
                          className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                          placeholder="Email or mobile"
                          name="userName"
                          value={fromData.userName}
                          aria-label="Email"
                          aria-describedby="email-addon"
                          onChange={handleChange}
                        />
                        <span className=" text-rose-500 font-bold">
                          {errors?.userName}
                        </span>
                      </div>
                      <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
                        Password
                      </label>
                      <div className="mb-4">
                        <input
                          type="text"
                          className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                          placeholder="Password"
                          name="password"
                          value={fromData.password}
                          aria-label="Password"
                          aria-describedby="password-addon"
                          onChange={handleChange}
                        />
                        <span className=" text-rose-500 font-bold">
                          {errors?.password}
                        </span>
                      </div>
                      <div className="min-h-6 mb-0.5 block pl-12">
                        <input
                          id="rememberMe"
                          className="mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 h-5 relative float-left -ml-12 w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right"
                          type="checkbox"
                        />
                        <label
                          className="mb-2 ml-1 font-normal cursor-pointer select-none text-sm text-slate-700"
                          htmlFor="rememberMe"
                        >
                          Remember me
                        </label>
                      </div>
                      {apiErrors && (
                        <div
                          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                          role="alert"
                        >
                          <strong className="font-bold"></strong>
                          <span className="block sm:inline">
                            {JSON.stringify(apiErrors)}.
                          </span>
                        </div>
                      )}
                      <div className="text-center">
                        <button
                          type="submit"
                          className="inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85"
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="p-6 px-1 pt-0 text-center bg-transparent border-t-0 border-t-solid rounded-b-2xl lg:px-2">
                    <p className="mx-auto mb-6 leading-normal text-sm">
                      Don't have an account?
                      <Link
                        to="/sign-up"
                        className="relative z-10 font-semibold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-full px-3 lg:flex-0 shrink-0 md:w-6/12">
                <div className="absolute top-0 hidden w-3/5 h-full -mr-32 overflow-hidden -skew-x-10 -right-40 rounded-bl-xl md:block">
                  <div
                    className="absolute inset-x-0 top-0 z-0 h-full -ml-16 bg-cover skew-x-10"
                    style={{
                      backgroundImage: `url('/assets/img/curved-images/curved6.jpg')`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SignIn;
