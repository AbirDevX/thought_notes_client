import React from "react";
// import toast from "react-hot-toast";
import { convertToBase64 } from "./convertToBase64";

const upload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const imgType = ["image/jpeg", "image/jpg", "image/png"];
  const file = event.target.files?.[0];

  if (!file) {
    // toast.error("Avatar not selected!");
    return;
  }

  if (file.size > 5000000) {
    // toast.error("File is too large! (Maximum size: 5MB)");
    return;
  }

  if (!imgType.includes(file.type)) {
    // toast.error("Only JPG/PNG/JPEG files are accepted!");
    return;
  }

  const base64Format = await convertToBase64(file);
  return base64Format;
};

export { upload };

