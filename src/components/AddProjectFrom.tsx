/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { addFileHelper } from "../helper/authHelper";
import { useAppSelector } from "../hooks/hooks";
import { projectValidation } from "../validation/validation";

function AddProjectFrom({
  setShowFrom,
}: {
  setShowFrom: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { accessToken } = useAppSelector((state) => state.auth);
  const [formData, setFromData] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState({});
  const [apiErrors, setApiErrors] = useState("");
  const [file, setFile] = useState(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFromData((prv) => {
      return { ...prv, [name]: value };
    });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const imgType = ["image/jpeg", "image/jpg", "image/png"];
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("Avatar not selected!");
      setFile(null);
      return;
    }
    if (file.size > 100000) {
      toast.error("File is too large! (Maximum size: 1MB)");
      setFile(null);
      return;
    }
    if (!imgType.includes(file.type)) {
      toast.error("Only JPG/PNG/JPEG files are accepted!");
      setFile(null);
      return;
    }
    setFile(file);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      const errors = projectValidation(formData);
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }
      setErrors({});
      setApiErrors("");
      const payload = { ...formData, img: file };
      const { status } = await addFileHelper(payload, accessToken);
      if (status !== 200) throw new Error("Error was occur.!");
      toast.success("Project added success");
      setFromData(() => {
        return { description: "", title: "" };
      });
      setFile(null);
      setShowFrom(false);
    } catch (error: any) {
      const apiError: AxiosError = error;
      setApiErrors(apiError.response?.data?.errors);
      toast.error("Project added Failed !");
    }
  };
  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label
          htmlFor="projectTitle"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Project Title
        </label>
        <input
          type="text"
          id="projectTitle"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="meeting"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <span className=" text-rose-500 font-bold text-xs">
          {errors?.title}
        </span>
      </div>
      <div className="mb-5">
        <label
          htmlFor="project_description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Project Description
        </label>
        <input
          type="text"
          id="project_description"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="a little bit about your project"
        />
        <span className=" text-rose-500 font-bold text-xs">
          {errors?.description}
        </span>
      </div>
      <div className="mb-5">
        <label
          htmlFor="project_banner"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Project Banner
        </label>
        <input
          type="file"
          id="project_banner"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          onChange={handleFileChange}
        />
        <span className=" text-rose-500 font-bold text-xs">
          {apiErrors?.img?.message}
        </span>
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
          />
        </div>
        <label
          htmlFor="terms"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          I agree with the{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            terms and conditions
          </a>
        </label>
      </div>
      {apiErrors && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold"></strong>
          <span className="block sm:inline">{JSON.stringify(apiErrors)}.</span>
        </div>
      )}
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}

export default AddProjectFrom;
