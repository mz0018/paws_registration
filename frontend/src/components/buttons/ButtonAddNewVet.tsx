import { useEffect, useRef, useState } from "react";
import useCaptureImage from "../../hooks/useCaptureImage";

export default function ButtonAddNewVet() {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { captureImage, sendToBackend, loading } = useCaptureImage();

  useEffect(() => {
    let stream: MediaStream | null = null;

    if (open) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
        })
        .catch((err) => console.error(err));
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [open]);

  const handleCapture = async () => {
    if (!videoRef.current) return;
    await captureImage(videoRef.current);
    await sendToBackend();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-green-600 text-white rounded-md"
      >
        Add Vet
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
          <div className="bg-white p-4 rounded-md w-[300px] text-center">
            <h2 className="mb-2 font-semibold">Scan ID</h2>

            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-md bg-black"
            />

            <div className="flex gap-2 mt-3 justify-center">
              <button
                onClick={handleCapture}
                className="px-3 py-1 bg-blue-500 text-white rounded"
                disabled={loading}
              >
                {loading ? "Uploading..." : "Capture"}
              </button>

              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}