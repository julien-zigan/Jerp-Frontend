import { useRef, useState } from "react";
import PdfThumbnailFromFile from "./PdfThumbNailFromFile";
import DragArea from "./DragArea";

export default function FileUploadCard() {
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

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://localhost:8080/api/jobconfirmations/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.text();
      console.log(result);
      setIsUploaded(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsUploaded(false);
      alert("Upload failed. Please try again.");
    }
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
        <div className="col-12 btn btn-outline-primary  mb-0 justify-content-center">
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
        <div className="row pt-3 justify-content-center">
          <div className="col d-flex">
            <button
              className="remove-button btn btn-secondary btn-lg w-100"
              type="button"
              onClick={handleRemove}
            >
              {isUploaded ? " \u274c Delete" : "Remove"}
            </button>
          </div>
          <div className="col">
            {!isUploaded && (
              <button
                className="upload-button btn btn-primary btn-lg w-100"
                type="button"
                onClick={handleUpload}
              >
                Upload
              </button>
            )}
            {isUploaded && (
              <button
                className="upload-button btn btn-success btn-lg w-100"
                type="button"
              >
                Create Invoice
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
