import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/js/pdf.worker.min.js";

export default function PdfThumbnailFromFile({ pdfFile }) {
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pdfFile || !canvasRef.current) return;
    let isMounted = true;
    loadAndRender(isMounted);
    return () => {
      isMounted = false;
      cancelRenderTask(renderTaskRef);
    };
  }, [pdfFile]);

  const loadAndRender = async (isMounted) => {
      try {
        await renderPdfToCanvas(
          pdfFile,
          canvasRef.current,
          renderTaskRef,
          setError
        );
        if (isMounted) setError(null);
      } catch (err) {
        if (err?.name === "RenderingCancelledException") return;
        console.error("Error loading PDF page:", err);
        if (isMounted) setError("Failed to load PDF thumbnail");
      }
    };

  const renderPdfToCanvas = async (file, canvas) => {
    const typedArray = new Uint8Array(await file.arrayBuffer());
    const pdf = await pdfjsLib.getDocument(typedArray).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1 });

    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const context = canvas.getContext("2d");

    if (renderTaskRef.current) {
      await renderTaskRef.current.cancel();
      renderTaskRef.current = null;
    }

    renderTaskRef.current = page.render({ canvasContext: context, viewport });
    await renderTaskRef.current.promise;
    renderTaskRef.current = null;
  };

  const cancelRenderTask = (renderTaskRef) => {
    if (renderTaskRef.current) {
      renderTaskRef.current.cancel();
      renderTaskRef.current = null;
    }
  };

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
