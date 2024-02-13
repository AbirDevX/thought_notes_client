/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import instance from "../axios_instance/instance";
import { useAppSelector } from "../hooks/hooks";

function Project({
  showFrom,
  setShowFrom,
}: {
  setShowFrom: React.Dispatch<boolean>;
  showFrom: boolean;
}) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const { accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await instance.get("/projects", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setProject(data?.project);
      } catch (error: any) {
        const err: AxiosError = error;
        setApiError(err.response?.data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div className="flex flex-wrap -mx-3">
      <div className="flex-none w-full max-w-full px-3 mt-6">
        <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
          <div className="p-4 pb-0 mb-0 bg-white rounded-t-2xl">
            <h6 className="mb-1">Projects</h6>
            <p className="leading-normal text-sm">Architects design houses</p>
          </div>
          <div className="flex-auto p-4">
            <div className="flex flex-wrap -mx-3">
              {project &&
                project?.map((item: any, i: number) => (
                  <div
                    key={item?._id}
                    className="w-full max-w-full px-3 mb-6 md:w-6/12 md:flex-none xl:mb-0 xl:w-3/12"
                  >
                    <div className="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
                      <div className="relative">
                        <a className="block shadow-xl rounded-2xl">
                          <img
                            src={item?.img}
                            alt="img-blur-shadow"
                            className="max-w-full shadow-soft-2xl rounded-2xl"
                          />
                        </a>
                      </div>
                      <div className="flex-auto px-1 pt-6">
                        <p className="relative z-10 mb-2 leading-normal text-transparent bg-gradient-to-tl from-gray-900 to-slate-800 text-sm bg-clip-text">
                          Project #{++i}
                        </p>
                        <a href="javascript:;">
                          <h5>{item?.title}</h5>
                        </a>
                        <p className="mb-6 leading-normal text-sm">
                          {item?.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <button
                            type="button"
                            className="inline-block px-8 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-fuchsia-500 text-fuchsia-500 hover:border-fuchsia-500 hover:bg-transparent hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500"
                          >
                            View Project
                          </button>
                          <div className="mt-2">
                            <a
                              href="javascript:;"
                              className="relative z-20 inline-flex items-center justify-center w-6 h-6 text-white transition-all duration-200 border-2 border-white border-solid ease-soft-in-out text-xs rounded-circle hover:z-30"
                              data-target="tooltip_trigger"
                              data-placement="bottom"
                            >
                              <img
                                className="w-full rounded-circle"
                                alt="Image placeholder"
                                src="../assets/img/team-1.jpg"
                              />
                            </a>
                            <div
                              data-target="tooltip"
                              className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm"
                              role="tooltip"
                            >
                              Elena Morison
                              <div
                                className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                                data-popper-arrow
                              ></div>
                            </div>
                            <a
                              href="javascript:;"
                              className="relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-white transition-all duration-200 border-2 border-white border-solid ease-soft-in-out text-xs rounded-circle hover:z-30"
                              data-target="tooltip_trigger"
                              data-placement="bottom"
                            >
                              <img
                                className="w-full rounded-circle"
                                alt="Image placeholder"
                                src="../assets/img/team-2.jpg"
                              />
                            </a>
                            <div
                              data-target="tooltip"
                              className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm"
                              role="tooltip"
                            >
                              Ryan Milly
                              <div
                                className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                                data-popper-arrow
                              ></div>
                            </div>
                            <a
                              href="javascript:;"
                              className="relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-white transition-all duration-200 border-2 border-white border-solid ease-soft-in-out text-xs rounded-circle hover:z-30"
                              data-target="tooltip_trigger"
                              data-placement="bottom"
                            >
                              <img
                                className="w-full rounded-circle"
                                alt="Image placeholder"
                                src="../assets/img/team-3.jpg"
                              />
                            </a>
                            <div
                              data-target="tooltip"
                              className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm"
                              role="tooltip"
                            >
                              Nick Daniel
                              <div
                                className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                                data-popper-arrow
                              ></div>
                            </div>
                            <a
                              href="javascript:;"
                              className="relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-white transition-all duration-200 border-2 border-white border-solid ease-soft-in-out text-xs rounded-circle hover:z-30"
                              data-target="tooltip_trigger"
                              data-placement="bottom"
                            >
                              <img
                                className="w-full rounded-circle"
                                alt="Image placeholder"
                                src="../assets/img/team-4.jpg"
                              />
                            </a>
                            <div
                              data-target="tooltip"
                              className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm"
                              role="tooltip"
                            >
                              Peterson
                              <div
                                className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                                data-popper-arrow
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {loading && <h2>Loading...</h2>}
              <div className="w-full max-w-full px-3 mb-6 md:w-6/12 md:flex-none xl:mb-0 xl:w-3/12">
                <div
                  onClick={() => setShowFrom((prv) => !prv)}
                  className="relative flex flex-col h-full min-w-0 break-words bg-transparent border border-solid shadow-none rounded-2xl border-slate-100 bg-clip-border"
                >
                  <div className="flex flex-col justify-center flex-auto p-6 text-center">
                    <a href="javascript:;">
                      <i className="mb-4 fa fa-plus text-slate-400"></i>
                      <h5 className="text-slate-400">
                        {showFrom ? "Cancel" : "New project"}
                      </h5>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
