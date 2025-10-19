import React from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

function Uploader() {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxSize: 100000,
    onDrop: (acceptedFiles) => {
      alert(acceptedFiles[0].name);
    },
  });
  return (
    <div className="w-full text-center">
      <div
        {...getRootProps()}
        className="px-6 py-8 rounded-md border-2 border-dashed cursor-pointer border-border bg-main"
      >
        <input {...getInputProps()} />
        <span className="mx-auto text-3xl flex-colo text-subMain">
          <FiUploadCloud />
        </span>
        <p className="mt-2 text-sm">Drag your image here</p>
        <em className="text-xs text-border">
          (only .jpg and .png files will be accepted)
        </em>
      </div>
    </div>
  );
}

export default Uploader;
