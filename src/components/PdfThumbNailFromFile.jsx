import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
pdfjsLib.GlobalWorkerOptions.workerSrc = "/js/pdf.worker.min.js";

export default function PdfThumbnailFromFile({ pdfFile }) {
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pdfFile) return;

    const reader = new FileReader();

    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result);

      try {
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 1 });
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Cancel previous renderTask if any
        if (renderTaskRef.current) {
          await renderTaskRef.current.cancel();
          renderTaskRef.current = null;
        }

        renderTaskRef.current = page.render({
          canvasContext: context,
          viewport: viewport,
        });

        await renderTaskRef.current.promise;
        renderTaskRef.current = null;

        setError(null);
      } catch (err) {
        if (err?.name === "RenderingCancelledException") {
          return;
        }
        console.error("Error loading PDF page:", err);
        setError("Failed to load PDF thumbnail");
      }
    };

    reader.onerror = () => {
      setError("Failed to read PDF file");
    };

    reader.readAsArrayBuffer(pdfFile);

    return () => {
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }
    };
  }, [pdfFile]);

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{ maxWidth: "100%", border: "1px solid #ddd" }}
      />
    </div>
  );
}
