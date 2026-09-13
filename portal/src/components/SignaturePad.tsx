import { forwardRef, useEffect, useImperativeHandle, useRef, useState, type PointerEvent } from "react";
import { useTranslation } from "react-i18next";

export interface SignaturePadHandle {
  clear: () => void;
  isEmpty: () => boolean;
  exportCompressed: () => Promise<Blob>;
}

export const SignaturePad = forwardRef<SignaturePadHandle>(function SignaturePad(_, ref) {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const emptyRef = useRef(true);
  const [isEmpty, setIsEmpty] = useState(true);

  const prepareCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const snapshot = emptyRef.current ? null : canvas.toDataURL();
    canvas.width = Math.max(1, Math.round(rect.width * ratio));
    canvas.height = Math.max(1, Math.round(rect.height * ratio));
    const context = canvas.getContext("2d");
    if (!context) return;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = 2.4;
    context.strokeStyle = "#123f36";
    if (snapshot) {
      const image = new Image();
      image.onload = () => context.drawImage(image, 0, 0, rect.width, rect.height);
      image.src = snapshot;
    }
  };

  useEffect(() => {
    prepareCanvas();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(prepareCanvas);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  const point = (event: PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const startDrawing = (event: PointerEvent<HTMLCanvasElement>) => {
    const context = event.currentTarget.getContext("2d");
    if (!context) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const { x, y } = point(event);
    context.beginPath();
    context.moveTo(x, y);
    drawingRef.current = true;
  };

  const draw = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const context = event.currentTarget.getContext("2d");
    if (!context) return;
    const { x, y } = point(event);
    context.lineTo(x, y);
    context.stroke();
    if (emptyRef.current) {
      emptyRef.current = false;
      setIsEmpty(false);
    }
  };

  const stopDrawing = () => {
    drawingRef.current = false;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (canvas && context) context.clearRect(0, 0, canvas.width, canvas.height);
    emptyRef.current = true;
    setIsEmpty(true);
  };

  const exportCompressed = async () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || emptyRef.current) throw new Error("SIGNATURE_REQUIRED");

    const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
    let left = canvas.width;
    let top = canvas.height;
    let right = 0;
    let bottom = 0;
    for (let y = 0; y < canvas.height; y += 1) {
      for (let x = 0; x < canvas.width; x += 1) {
        if (pixels.data[(y * canvas.width + x) * 4 + 3] > 8) {
          left = Math.min(left, x);
          right = Math.max(right, x);
          top = Math.min(top, y);
          bottom = Math.max(bottom, y);
        }
      }
    }

    const padding = 24;
    left = Math.max(0, left - padding);
    top = Math.max(0, top - padding);
    right = Math.min(canvas.width - 1, right + padding);
    bottom = Math.min(canvas.height - 1, bottom + padding);
    const sourceWidth = right - left + 1;
    const sourceHeight = bottom - top + 1;
    const scale = Math.min(1, 1000 / sourceWidth, 350 / sourceHeight);
    const output = document.createElement("canvas");
    output.width = Math.max(1, Math.round(sourceWidth * scale));
    output.height = Math.max(1, Math.round(sourceHeight * scale));
    output.getContext("2d")?.drawImage(
      canvas,
      left,
      top,
      sourceWidth,
      sourceHeight,
      0,
      0,
      output.width,
      output.height,
    );

    return new Promise<Blob>((resolve, reject) => {
      output.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("SIGNATURE_EXPORT_FAILED"))),
        "image/webp",
        0.82,
      );
    });
  };

  useImperativeHandle(ref, () => ({ clear, isEmpty: () => emptyRef.current, exportCompressed }));

  return (
    <div>
      <div className="relative overflow-hidden border border-border bg-white">
        <canvas
          ref={canvasRef}
          className="block h-48 w-full touch-none cursor-crosshair"
          aria-label={t("application.signature.canvasLabel")}
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerCancel={stopDrawing}
          onPointerLeave={stopDrawing}
        />
        {isEmpty && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-muted-foreground/60">
            {t("application.signature.placeholder")}
          </span>
        )}
        <span className="pointer-events-none absolute inset-x-8 bottom-7 border-b border-primary/25" />
      </div>
      <button type="button" onClick={clear} className="mt-3 text-sm font-semibold text-primary hover:text-gold">
        {t("application.signature.clear")}
      </button>
    </div>
  );
});
