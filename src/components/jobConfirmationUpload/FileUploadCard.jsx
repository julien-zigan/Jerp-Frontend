import { useRef, useState } from "react";
import PdfThumbnailFromFile from "./PdfThumbNailFromFile";
import DragArea from "./DragArea";
import UploadButtonGruop from "./UploadButtonGroup";

export default function FileUploadCard({onUploadSuccess}) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const inputRef = useRef(null);
  const headerRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Only PDF files are allowed!");
    }
  };

  const handleRemove = () => {
    setFile(null);
    setIsUploaded(false);
  };

  return (
    <div
      className={`upload-card card p-4 shadow rounded m-4 ${
        isDragging ? "dragging" : ""
      }`}
      style={{ width: "400px" }}
    >
      {!isUploaded && <h3>Upload your File</h3>}

      {isUploaded && (
        <div
          className="col-12 btn btn-outline-primary  mb-0 justify-content-center"
          onClick={handleRemove}
        >
          Upload more
        </div>
      )}

      {file && (
        <div className="mt-4">
          <PdfThumbnailFromFile pdfFile={file} />
        </div>
      )}

      {!file && (
        <DragArea
          isDragging={isDragging}
          setIsDragging={setIsDragging}
          headerRef={headerRef}
          inputRef={inputRef}
          setFile={setFile}
        />
      )}

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        hidden
        onChange={handleFileChange}
        id="fileInput"
      />

      {isUploaded && (
        <div className="col-12 alert alert-success mt-3 mb-0 justify-content-center">
          File uploaded successfully
        </div>
      )}

      {file && (
        <UploadButtonGruop
          handleRemove={handleRemove}
          isUploaded={isUploaded}
          setIsUploaded={setIsUploaded}
          file={file}
          onUploadSuccess={onUploadSuccess}
        />
      )}
    </div>
  );
}
