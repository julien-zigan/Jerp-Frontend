export default function UploadButtonGruop({
  handleRemove,
  isUploaded,
  setIsUploaded,
  file,
  onUploadSuccess,
}) {
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

      if (!response.ok) throw new Error("Upload failed");

      const locationHeader = response.headers.get("Location"); // <- Access the header

      if (!locationHeader) {
        throw new Error("No Location header found in response");
      }

      onUploadSuccess(locationHeader);
      setIsUploaded(true);

    } catch (error) {
      console.error("Error uploading file:", error);
      setIsUploaded(false);
      alert("Upload failed. Please try again.");
    }
  };

  return (
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
  );
}
