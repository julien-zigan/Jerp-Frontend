import "../public/css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FileUploadCard from "./components/jobConfirmationUpload/FileUploadCard";

function App() {
  return (
    <div className="app d-flex justify-content-center 
                    align-items-center text-center vh-100 vw-100">
      <FileUploadCard />
    </div>
  );
}

export default App;
