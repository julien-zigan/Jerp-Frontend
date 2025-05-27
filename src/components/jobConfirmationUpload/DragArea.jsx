import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

const updateHeaderText = (headerRef, text) => {
  if (headerRef.current) {
    headerRef.current.textContent = text;
  }
};

export default function DragArea({ isDragging, setIsDragging, headerRef, inputRef, setFile }) {
  const onDragOver = (e) => handleDragOver(e, setIsDragging, headerRef);
  const onDragLeave = (e) => handleDragLeave(e, setIsDragging, headerRef);
  const onDrop = (e) => handleDrop(e, setIsDragging, headerRef, setFile);
  const onBrowseClick = () => handleBrowseClick(inputRef);
  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onBrowseClick();
    }
  };

  return (
    <div
      className={`drag-area btn btn-light fw-bold d-flex flex-column p-3 m-3 rounded align-items-center justify-content-center text-primary ${
        isDragging ? "dragging" : ""
      }`}
      id="drag-area"
      role="button"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onBrowseClick}
      onKeyDown={onKeyDown}
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
        onClick={onBrowseClick}
      >
        browse
      </span>
    </div>
  );
}

function handleDragOver(e, setIsDragging, headerRef) {
  e.preventDefault();
  setIsDragging(true);
  updateHeaderText(headerRef, "Release to Upload");
}

function handleDragLeave(e, setIsDragging, headerRef) {
  e.preventDefault();
  setIsDragging(false);
  updateHeaderText(headerRef, "Drag & Drop");
}

function handleDrop(e, setIsDragging, headerRef, setFile) {
  e.preventDefault();
  setIsDragging(false);
  updateHeaderText(headerRef, "Drag & Drop");

  const droppedFile = e.dataTransfer.files[0];
  if (!droppedFile || droppedFile.type !== "application/pdf") {
    alert("Only PDF files are allowed!");
    return;
  }

  setFile(droppedFile);
}

function handleBrowseClick(inputRef) {
  inputRef.current?.click();
}
