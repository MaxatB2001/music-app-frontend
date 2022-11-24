import React, { useRef } from "react";

type FileUploadFormProps = {
  setFile: Function;
  accept: string;
  children: JSX.Element;
};

const FileUploadForm: React.FC<FileUploadFormProps> = ({
  setFile,
  accept,
  children,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setFile(e.target.files[0])
      console.log(e.target.files[0]);
    }
  }

  return (
    <div onClick={() => ref?.current?.click()}>
      <input
        type="file"
        accept={accept}
        style={{ display: "none" }}
        ref={ref}
        onChange={onChange }
      />
      {children}
    </div>
  );
};

export default FileUploadForm;
