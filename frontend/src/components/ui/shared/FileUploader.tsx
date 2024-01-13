import { useCallback, useState } from "react";
import {useDropzone} from 'react-dropzone'
import { Button } from "../button";


type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaURL: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState("");

  const getFileExtension = (filepath: string) => {
    const filename = filepath.split("/").pop(); // Wyodrębnij nazwę pliku z pełnej ścieżki
    const extension = filename?.split(".").pop()?.toLowerCase();

    switch (extension) {
      case "jpg":
        return <img src="/assets/icons/image-placeholder.svg" alt="img" />;
      case "jpeg":
        return <img src="/assets/icons/image-placeholder.svg" alt="img" />;
      case "png":
        return <img src="/assets/icons/image-placeholder.svg" alt="img" />;
      case "pdf":
        return <img src="/assets/icons/pdf-placeholder.svg" alt="pdf" />;
      case "rar":
        return <img src="/assets/icons/rar-placeholder.svg" alt="rar" />;
      case "zip":
        return <img src="/assets/icons/zip-placeholder.svg" alt="zip" />;
      case "doc":
        return <img src="/assets/icons/doc-placeholder.svg" alt="doc" />;
      case "txt":
        return <img src="/assets/icons/txt-placeholder.svg" alt="txt" />;
      default:
        return <img src="/assets/images/default-icon.svg" alt="" />;
    }
  };

  const removeFile = (id: number) => {
    const updatedFiles = file.filter((_, index) => index !== id);
    setFile(updatedFiles);
  };

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      // Do something with the files
      setFile((prevFiles) => [...prevFiles, ...acceptedFiles]);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jgp", ".pdf", ".doc", "zip", "rar", "raw"],
      "pdf/*": [".pdf"],
      "raw/*": [".zip", ".rar"],
      "doc/*": [".doc", ".docx"],
      "txt/*": [".txt"],
    },
  });

  return (
    <>
      <div
        className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer "
        {...getRootProps()}
      >
        <input className="cursor-pointer" {...getInputProps()} />
        {file.length === 0 ? (
          <div className="file_uploader-box">
            <img
              src="/assets/icons/file-upload.svg"
              alt="file-upload"
              width={85}
              height={65}
            />
            <h3 className="base-medium text-light-2 m-2 mt-6">
              Drag file here
            </h3>
            <p className="text-light-4 small-regular mb-6">
              PNG, JPG, JPEG, DOC, PDF, ZIP
            </p>
            <Button className="shad-button_dark_4">Select from computer</Button>
          </div>
        ) : (
          <div className="flex-center items-center py-2 gap-3 ">
            <img
              src="/assets/icons/file-upload.svg"
              alt="file-upload"
              width={50}
              height={50}
            />
            <p className="text-light-4 small-regular ">
              Click or drag to add more.
            </p>
          </div>
        )}
      </div>
      <div>
        {file.length > 0 && (
          <div className="flex flex-col flex-1 justify-start w-full p-5 lg:p-10  ">
            <div className="flex flex-wrap gap-6">
              {file.map((file, index) => {
                const type = getFileExtension(file?.path);
                return (
                  <div key={index} className="w-16 h-16 relative flex-center">
                    {type}
                    <Button
                      onClick={() => removeFile(index)}
                      className="absolute bottom-11 left-12 text-sm bg-transparent hover:text-blue-600"
                    >
                      X
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FileUploader;
