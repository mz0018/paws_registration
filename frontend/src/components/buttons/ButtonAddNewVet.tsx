import { useEffect } from "react";
import useCaptureImage from "../../hooks/useCaptureImage";

export default function ButtonAddNewVet() {
  

  const { videoRef, canvasRef, image, startCamera, capture, retake, stopCamera, open, setOpen, uploading, uploadImage } = useCaptureImage();

  useEffect(() => {
    if (open) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-green-600 text-white rounded-md"
      >
        Add Vet
      </button>

      {open && (
        <div className="fixed inset-0 grid place-items-center bg-black/30">
          <div className="bg-white p-4 rounded-lg w-[90%] max-w-md">
            
            {!image ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full rounded-md"
                />

                <button
                  onClick={capture}
                  className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md"
                >
                  Capture
                </button>
              </>
            ) : (
              <>
                <img
                  src={image}
                  alt="preview"
                  className="w-full rounded-md"
                />

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={retake}
                    className="flex-1 bg-gray-500 text-white py-2 rounded-md"
                  >
                    Retake
                  </button>

                  <button
                    onClick={uploadImage}
                    disabled={uploading}
                    className="flex-1 bg-green-600 text-white py-2 rounded-md"
                  >
                    {uploading ? "Uploading..." : "Use Image"}
                  </button>
                </div>
              </>
            )}

            <button
              onClick={() => setOpen(false)}
              className="mt-2 text-sm text-red-500"
            >
              Close
            </button>

            {/* hidden canvas */}
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      )}
    </>
  );
}