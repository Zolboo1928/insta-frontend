"use client";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { decodedType } from "../custom_components/AddComment";

const Page = () => {
  const token = localStorage.getItem("authorization");
  const decoded: decodedType = jwtDecode(token || "");

  const [title, setTitle] = useState<string>("");
  const [images, setImages] = useState<FileList | null>(null);

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const uploadImages = async () => {
    if (!images) return;
    const uploadPromises = Array.from(images).map(async (image) => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "zolboo");
      formData.append("cloud_name", "dm77t1dnd");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dm77t1dnd/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await response.json();
      return result.secure_url;
    });

    const uploadedUrls = await Promise.all(uploadPromises);
    const imee = uploadedUrls.filter((url) => url !== null) as string[];
    setUploadedImages(imee);
    console.log(imee);
    fetchToBackend(imee);
  };

  const fetchToBackend = async ({ imee }: { imee: string[] }) => {
    console.log("imee in back", imee);
    const response = await fetch(
      "https://instagram-service-xt7j.onrender.com/post/uploadPost",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          userId: decoded._id,
          postImages: imee,
        }),
      }
    );
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      <input
        type="file"
        multiple
        onChange={(e) => {
          const files = e.target.files;
          if (files) {
            setImages(files);
          }
        }}
        className="file:border file:border-gray-300 file:rounded-md file:px-4 file:py-2 file:bg-blue-50 file:text-blue-700 file:cursor-pointer hover:file:bg-blue-100"
      />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={uploadImages}>Upload</button>

      <div className="mt-4 text-center">
        {uploadedImages.map((img, index) => (
          <img
            key={index}
            src={img}
            className="max-w-full h-[300px] rounded-lg shadow-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
