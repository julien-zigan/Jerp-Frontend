import { useState } from "react";
import FileUploadCard from "../components/jobConfirmationUpload/FileUploadCard";
import JobConfirmationDataCard from "../components/jobConfirmationData/JobConfirmationDataCard";

function MainContent() {
  const [dataUrl, setDataUrl] = useState(null);

  return (
    <div
      className="app d-flex justify-content-center 
                    align-items-center text-center vh-100 vw-100"
    >
      <div className="row d-flex justify-content-center align-items-stretch gap-4 p-4">
        <FileUploadCard onUploadSuccess={setDataUrl} />
        {dataUrl && <JobConfirmationDataCard className="" url={dataUrl} />}
      </div>
    </div>
  );
}

export default MainContent;
