import { useRef, useState, useEffect } from "react";

type UseCaptureImageReturn = {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  image: string | null;     
  open: boolean;
  uploading: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  startCamera: () => Promise<void>;
  capture: () => void;
  retake: () => void;
  uploadImage: () => void;
  stopCamera: () => void;
};

const useCaptureImage = (): UseCaptureImageReturn => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  const stopCamera = () => {
    stream?.getTracks().forEach((track) => track.stop());
  };

  const capture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const MAX_WIDTH = 1024;

    const scale = MAX_WIDTH / video.videoWidth;
    const width = MAX_WIDTH;
    const height = video.videoHeight * scale;

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(video, 0, 0, width, height);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;

        const previewUrl = URL.createObjectURL(blob);

        setImage(previewUrl);
        setImageBlob(blob);

        stopCamera();
      },
      "image/jpeg",
      0.7
    );
  };

  const retake = () => {
    if (image) {
      URL.revokeObjectURL(image);
    }

    setImage(null);
    setImageBlob(null);
    startCamera();
  };

  const uploadImage = async () => {
    if (!imageBlob) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", imageBlob, "vet-id.jpg");

      const res = await fetch(`${import.meta.env.VITE_PYTHON_BACKEND_URL}/auth/upload-image`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      console.log("UPLOAD SUCCESS:", data);

      setOpen(false);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  return {
    videoRef,
    canvasRef,
    image,
    startCamera,
    capture,
    retake,
    stopCamera,
    open,
    setOpen,
    uploading,
    uploadImage
  };
};

export default useCaptureImage;