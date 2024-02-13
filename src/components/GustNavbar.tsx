import { NavLink } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

function GustNavbar() {
  const { isAuthenticate } = useAppSelector((state) => state.auth);
  return (
    <div className="container sticky top-0 z-sticky">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full max-w-full px-3 flex-0">
          <nav className="absolute top-0 left-0 right-0 z-30 flex flex-wrap items-center px-4 py-2 mx-6 my-4 shadow-soft-2xl rounded-blur bg-white/80 backdrop-blur-2xl backdrop-saturate-200 lg:flex-nowrap lg:justify-start">
            <div className="flex items-center justify-between w-full p-0 pl-6 mx-auto flex-wrap-inherit">
              <a
                className="py-2.375 text-sm mr-4 ml-4 whitespace-nowrap font-bold text-slate-700 lg:ml-0"
                href="../pages/dashboard.html"
              >
                Soft UI Dashboard
              </a>
              <button
                // navbar-trigger
                className="px-3 py-1 ml-2 leading-none transition-all bg-transparent border border-transparent border-solid rounded-lg shadow-none cursor-pointer text-lg ease-soft-in-out lg:hidden"
                type="button"
                aria-controls="navigation"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="inline-block mt-2 align-middle bg-center bg-no-repeat bg-cover w-6 h-6 bg-none">
                  <span className="w-5.5 rounded-xs relative my-0 mx-auto block h-px bg-gray-600 transition-all duration-300"></span>
                  <span className="w-5.5 rounded-xs mt-1.75 relative my-0 mx-auto block h-px bg-gray-600 transition-all duration-300"></span>
                  <span className="w-5.5 rounded-xs mt-1.75 relative my-0 mx-auto block h-px bg-gray-600 transition-all duration-300"></span>
                </span>
              </button>
              <div
                // navbar-menu
                className="items-center flex-grow overflow-hidden transition-all duration-500 ease-soft lg-max:max-h-0 basis-full lg:flex lg:basis-auto"
              >
                <ul className="flex flex-col pl-0 mx-auto mb-0 list-none lg:flex-row xl:ml-auto">
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        ` ${
                          isActive ? "text-blue-500" : "text-slate-700"
                        } flex items-center px-4 py-2 mr-2 font-normal transition-all lg-max:opacity-0 duration-250 ease-soft-in-out text-sm  lg:px-2`
                      }
                      aria-current="page"
                      to="/dashboard"
                    >
                      <i className="mr-1 fa fa-chart-pie opacity-60"></i>
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        ` ${
                          isActive ? "text-blue-500" : "text-slate-700"
                        } flex items-center px-4 py-2 mr-2 font-normal transition-all lg-max:opacity-0 duration-250 ease-soft-in-out text-sm  lg:px-2`
                      }
                      aria-current="page"
                      to="/"
                    >
                      <i className="mr-1 fa fa-chart-pie opacity-60"></i>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        `block px-4 py-2 mr-2 font-normal transition-all lg-max:opacity-0 duration-250 ease-soft-in-out text-sm ${
                          isActive ? "text-blue-500" : "text-slate-700"
                        } lg:px-2`
                      }
                      to="/profile"
                    >
                      <i className="mr-1 fa fa-user opacity-60"></i>
                      Profile
                    </NavLink>
                  </li>
                  {!isAuthenticate && (
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          `block px-4 py-2 mr-2 font-normal transition-all lg-max:opacity-0 duration-250 ease-soft-in-out text-sm ${
                            isActive ? "text-blue-500" : "text-slate-700"
                          } lg:px-2`
                        }
                        to="/sign-up"
                      >
                        <i className="mr-1 fas fa-user-circle opacity-60"></i>
                        Sign Up
                      </NavLink>
                    </li>
                  )}
                  {!isAuthenticate && (
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          `block px-4 py-2 mr-2 font-normal transition-all lg-max:opacity-0 duration-250 ease-soft-in-out text-sm ${
                            isActive ? "text-blue-500" : "text-slate-700"
                          } lg:px-2`
                        }
                        to="/sign-in"
                      >
                        <i className="mr-1 fas fa-key opacity-60"></i>
                        Sign In
                      </NavLink>
                    </li>
                  )}
                </ul>
                {/* online builder btn */}
                {/* <!-- <li className="flex items-center">
                  <a
                    className="leading-pro ease-soft-in text-fuchsia-500 border-fuchsia-500 text-xs tracking-tight-soft bg-150 bg-x-25 rounded-3.5xl hover:border-fuchsia-500 hover:scale-102 hover:text-fuchsia-500 active:hover:border-fuchsia-500 active:hover:scale-102 active:hover:text-fuchsia-500 active:opacity-85 active:shadow-soft-xs active:bg-fuchsia-500 active:border-fuchsia-500 mr-2 mb-0 inline-block cursor-pointer border border-solid bg-transparent py-2 px-8 text-center align-middle font-bold uppercase shadow-none transition-all hover:bg-transparent hover:opacity-75 hover:shadow-none active:scale-100 active:text-white active:hover:bg-transparent active:hover:opacity-75 active:hover:shadow-none"
                    target="_blank"
                    href="https://www.creative-tim.com/builder/soft-ui?ref=navbar-dashboard&amp;_ga=2.76518741.1192788655.1647724933-1242940210.1644448053"
                    >Online Builder</a
                  >
                </li> --> */}
                <ul className="hidden pl-0 mb-0 list-none lg:block lg:flex-row">
                  <li>
                    <a
                      href="https://www.creative-tim.com/product/soft-ui-dashboard-tailwind"
                      target="_blank"
                      className="leading-pro hover:scale-102 hover:shadow-soft-xs active:opacity-85 ease-soft-in text-xs tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 rounded-3.5xl mb-0 mr-1 inline-block cursor-pointer border-0 bg-transparent px-8 py-2 text-center align-middle font-bold uppercase text-white transition-all"
                    >
                      Free download
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default GustNavbar;
