import { IoLogOut } from "react-icons/io5";
import { Link } from "react-router-dom";
import { removeCookie } from "../helper/authHelper";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  setAccessToken,
  setIsAuthenticate,
  setUser,
} from "../redux/slice/authSlice";

function Navbar() {
  const { isAuthenticate, user } = useAppSelector((state) => state.auth);
  const disPatch = useAppDispatch();
  const logOut = () => {
    removeCookie();
    disPatch(setUser(null));
    disPatch(setIsAuthenticate(false));
    disPatch(setAccessToken(""));
  };
  return (
    <nav
      className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start"
      navbar-main
      navbar-scroll="true"
    >
      <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
        <nav>
          {/* <!-- breadcrumb --> */}
          <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
            <li className="leading-normal text-sm">
              <a className="opacity-50 text-slate-700" href="javascript:;">
                Pages
              </a>
            </li>
            <li
              className="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']"
              aria-current="page"
            >
              Dashboard
            </li>
          </ol>
          <h6 className="mb-0 font-bold capitalize">Dashboard</h6>
        </nav>

        <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
          <div className="flex items-center md:ml-auto md:pr-4">
            <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
              <span className="text-sm ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="pl-8.75 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                placeholder="Type here..."
              />
            </div>
          </div>
          <ul className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
            {/* <!-- online builder btn  --> */}
            <li className="flex items-center">
              {!isAuthenticate && (
                <a
                  href="../pages/sign-in.html"
                  className="block px-0 py-2 font-semibold transition-all ease-nav-brand text-sm text-slate-500"
                >
                  <i className="fa fa-user sm:mr-1"></i>
                  <span className="hidden sm:inline">Sign In</span>
                </a>
              )}
              {isAuthenticate && (
                <Link to="/profile">
                  <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <span className="font-medium text-gray-600 dark:text-gray-300 uppercase">
                      {user?.name?.split(" ")[0][0]}
                    </span>
                  </div>
                </Link>
              )}
            </li>
            <li className="flex items-center pl-4 xl:hidden">
              <a
                href="javascript:;"
                className="block p-0 transition-all ease-nav-brand text-sm text-slate-500"
                sidenav-trigger
              >
                <div className="w-4.5 overflow-hidden">
                  <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                  <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                  <i className="ease-soft relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                </div>
              </a>
            </li>
            <li className="flex items-center px-4">
              <a
                href="javascript:;"
                className="p-0 transition-all text-sm ease-nav-brand text-slate-500"
              >
                <i
                  fixed-plugin-button-nav
                  className="cursor-pointer fa fa-cog"
                ></i>
                {/* <!-- fixed-plugin-button-nav  --> */}
              </a>
            </li>

            {/* <!-- notifications --> */}

            <li className="relative flex items-center pr-2">
              <p className="hidden transform-dropdown-show"></p>
              <a
                href="javascript:;"
                className="block p-0 transition-all text-sm ease-nav-brand text-slate-500"
              >
                <IoLogOut size={22} onClick={logOut} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
