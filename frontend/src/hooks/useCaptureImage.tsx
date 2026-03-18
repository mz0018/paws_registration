import { useState } from "react";
import axios from "axios";

type CaptureResult = {
  imageBlob: Blob | null;
  captureImage: (video: HTMLVideoElement) => Promise<void>;
  sendToBackend: () => Promise<any>;
  loading: boolean;
};

const useCaptureImage = (): CaptureResult => {
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);

  const captureImage = async (video: HTMLVideoElement) => {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    return new Promise<void>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) setImageBlob(blob);
        resolve();
      }, "image/jpeg");
    });
  };

  const sendToBackend = async () => {
    if (!imageBlob) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", imageBlob, "capture.jpg");

      const response = await axios.post(
        `${import.meta.env.VITE_PYTHON_BACKEND_URL}/auth/scan-img`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { imageBlob, captureImage, sendToBackend, loading };
};

export default useCaptureImage;