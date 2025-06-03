import { useEffect, useState, useRef } from "react";
import SingleConfirmationData from "./SingleConfirmationData";
import ManyConfirmationsData from "./ManyConfirmationsData";

export default function JobConfirmationDataCard({ url }) {
  const [jsonData, setJsonData] = useState([]);
  const loadedUrls = useRef(new Set());

  useEffect(() => {
    if (!url || loadedUrls.current.has(url)) return;

    loadedUrls.current.add(url);

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch");
        return response.json();
      })
      .then((data) => {
        setJsonData((prev) => [...prev, data]);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [url]);

  return (
    <>
      {jsonData.length === 1 && <SingleConfirmationData data={jsonData[0]} />}
      {jsonData.length > 1 && <ManyConfirmationsData data={jsonData} />}
    </>
  );
}
