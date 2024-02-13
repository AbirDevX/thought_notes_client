/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { allClients, getAllProject } from "../helper/helper";
import { useAppSelector } from "../hooks/hooks";

function Table() {
  const { accessToken } = useAppSelector((state) => state.auth);
  const [data, setData] = useState(null);
  const [clients, setClients] = useState(null);

  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await getAllProject(accessToken);
        setData(data?.project);
      } catch (error: any) {
        const apiErr: AxiosError = error;
        setApiError(apiErr.response?.data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await allClients(accessToken);
        setClients(data?.clients);
      } catch (error: any) {
        const apiErr: AxiosError = error;
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div className="w-full px-6 py-6 mx-auto">
      <div className="flex flex-wrap -mx-3">
        {/* PROJECT TABLE START */}
        <div className="flex-none w-full max-w-full px-3">
          <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
            <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
              <h6>Admin Notes </h6>
            </div>
            <div className="flex-auto px-0 pt-0 pb-2">
              <div className="p-0 overflow-x-auto">
                <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                  <thead className="align-bottom">
                    <tr>
                      <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                        Author
                      </th>
                      <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                        Title
                      </th>
                      <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                        Created
                      </th>
                      <th
                        colSpan={2}
                        className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      !loading &&
                      data?.map((item) => (
                        <tr>
                          <td
                            key={item?._id}
                            className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent"
                          >
                            <div className="flex px-2 py-1">
                              <div>
                                <img
                                  src={item?.userId?.avatar}
                                  className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-soft-in-out h-9 w-9 rounded-xl"
                                  alt="user1"
                                />
                              </div>
                              <div className="flex flex-col justify-center">
                                <h6 className="mb-0 text-sm leading-normal capitalize">
                                  {item?.userId?.name}
                                </h6>
                                <p className="mb-0 text-xs leading-tight text-slate-400">
                                  {item?.userId?.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <p className="mb-0 text-xs font-semibold leading-tight">
                              {item?.title}
                            </p>
                            <p className="mb-0 text-xs leading-tight text-slate-400">
                              {item?.description}
                            </p>
                          </td>
                          <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <span className="text-xs font-semibold leading-tight text-slate-400">
                              {new Date(item?.createdAt).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <img
                              src={"/assets/img/edit.png"}
                              className="inline-flex items-center justify-center text-sm text-white transition-all duration-200 ease-soft-in-out h-6 w-6"
                              alt="user1"
                            />
                          </td>
                          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <img
                              src={"/assets/img/delete.png"}
                              className="inline-flex items-center justify-center text-sm text-white transition-all duration-200 ease-soft-in-out h-6 w-6"
                              alt="user1"
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* PROJECT TABLE END */}
        {/* USER TABLE START */}
        <div className="flex-none w-full max-w-full px-3">
          <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
            <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
              <h6>All Clients</h6>
            </div>
            <div className="flex-auto px-0 pt-0 pb-2">
              <div className="p-0 overflow-x-auto">
                <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                  <thead className="align-bottom">
                    <tr>
                      <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                        User
                      </th>

                      <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                        Status
                      </th>
                      <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                        Joined
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients &&
                      !loading &&
                      clients?.map((client) => (
                        <tr>
                          <td
                            key={client?._id}
                            className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent"
                          >
                            <div className="flex px-2 py-1">
                              <div>
                                <img
                                  src={client?.avatar}
                                  className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-soft-in-out h-9 w-9 rounded-xl"
                                  alt="user1"
                                />
                              </div>
                              <div className="flex flex-col justify-center">
                                <h6 className="mb-0 text-sm leading-normal capitalize">
                                  {client?.name}
                                </h6>
                                <p className="mb-0 text-xs leading-tight text-slate-400">
                                  {client?.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <span className="bg-gradient-to-tl from-green-600 to-lime-400 px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">
                              Active
                            </span>
                          </td>
                          <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <span className="text-xs font-semibold leading-tight text-slate-400">
                              {new Date(client?.createdAt).toLocaleDateString()}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* USER TABLE END */}
      </div>
    </div>
  );
}

export default Table;
