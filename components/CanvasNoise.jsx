"use client";
import { useEffect, useRef, useState } from "react";

export default function CanvasNoise() {
  const [showCanvas, setShowCanvas] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const setSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };

    setSize();
    window.addEventListener("resize", setSize);

    let animationFrame;
    let lastDraw = 0;
    const fps = 12;
    const interval = 1000 / fps;

    const drawNoise = () => {
      if (!ctx) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.fillStyle = "#f5f5dc";
      ctx.fillRect(0, 0, w, h);

      const dotCount = 4000;
      for (let i = 0; i < dotCount; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const radius = Math.random() * 2 + 0.5;
        const alpha = Math.random() * 0.3 + 0.5;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,0,0,${alpha})`;
        ctx.fill();
      }
    };

    const loop = (now) => {
      if (now - lastDraw > interval) {
        drawNoise();
        lastDraw = now;
      }
      animationFrame = requestAnimationFrame(loop);
    };

    let hasStarted = false;

    const startAnimation = () => {
      if (hasStarted) return;
      hasStarted = true;
      setShowCanvas(true);
      animationFrame = requestAnimationFrame(loop);
      window.removeEventListener("scroll", startAnimation);
      window.removeEventListener("wheel", startAnimation);
    };

    window.addEventListener("scroll", startAnimation);
    window.addEventListener("wheel", startAnimation);
    const timeout = setTimeout(startAnimation, 3000);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timeout);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("scroll", startAnimation);
      window.removeEventListener("wheel", startAnimation);
    };
  }, []);

  return showCanvas ? (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  ) : null;
}
