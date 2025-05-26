import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import PdfThumbnailFromFile from "./PdfThumbNailFromFile";
import "./FileUploadCard.css"; // optional external CSS

export default function FileUploadCard() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const inputRef = useRef(null);
  const headerRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
    if (headerRef.current) {
      headerRef.current.textContent = "Release to Upload";
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (headerRef.current) {
      headerRef.current.textContent = "Drag & Drop";
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (headerRef.current) {
      headerRef.current.textContent = "Drag & Drop";
    }

    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile || droppedFile.type !== "application/pdf") {
      alert("Only PDF files are allowed!");
      return;
    }

    setFile(droppedFile);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Only PDF files are allowed!");
    }
  };

  const handleBrowseClick = () => {
    inputRef.current?.click();
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
        "http://192.168.0.20:8080/api/jobconfirmations/upload",
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
        <div
          className={`drag-area btn btn-light fw-bold d-flex flex-column p-3 m-3 rounded align-items-center justify-content-center text-primary ${
            isDragging ? "dragging" : ""
          }`}
          id="drag-area"
          role="button"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
          tabIndex={0}
        >
          <div className="icon" style={{ fontSize: "6rem" }}>
            <FontAwesomeIcon icon={faFilePdf} />
          </div>
          <span
            ref={headerRef}
            className={`drop-header mb-3 fs-5 fw-bold ${
              isDragging ? "text-primary" : "text-secondary"
            }`}
          >
            Drag & Drop or
          </span>
          <span
            className="button btn btn-secondary fs-5 fw-bold"
            onClick={handleBrowseClick}
          >
            browse
          </span>
        </div>
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
