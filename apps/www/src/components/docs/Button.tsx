import React from "react";
import NoiseBackground from "@/lib/NoiseBackground";
import { cn } from "@/lib/utils";

const gradients = {
    default: ["rgb(255,100,150)", "rgb(100,150,255)", "rgb(255,200,100)"],
    emerald: ["rgb(52,211,153)", "rgb(34,211,238)", "rgb(163,230,53)"],
    fire: ["rgb(251,146,60)", "rgb(239,68,68)", "rgb(217,70,239)"]
};

export default function NoiseBackgroundDemo({ children, className, icon, variant = "default" }: { children: React.ReactNode, className?: string, icon?: React.ReactNode, variant?: "default" | "emerald" | "fire" }) {
    return (
        <NoiseBackground
            containerClassName={cn("w-fit p-1 rounded-full mx-auto", className)}
            gradientColors={gradients[variant]}
        >
            <button
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                className={cn(" h-full w-full cursor-pointer rounded-full border-none px-5 py-1 text-[15px] font-medium transition-all duration-100", "bg-gradient-to-r from-[#f5f5f5] via-[#f5f5f5] to-white text-black shadow-[inset_0_2px_0_#fafafa,0_0.5px_1px_#bbb]", "dark:bg-gradient-to-r dark:from-black dark:via-[#0a0a0a] dark:to-[#111] dark:text-white dark:shadow-[inset_0_1px_0_#111,0_1px_0_#333]", className)}
            >
                {children}
                {icon}
            </button>
        </NoiseBackground>

    );
}



// Create component NoiseBackground

// import { useEffect, useRef } from "react";

// function NoiseBackground({
//     children,
//     containerClassName = "",
//     gradientColors = ["rgb(255, 100, 150)", "rgb(100, 150, 255)", "rgb(255, 200, 100)"],
//     speed = 0.003,
//     noiseOpacity = 0.12,
// }: {
//     children: React.ReactNode;
//     containerClassName?: string;
//     gradientColors?: string[];
//     speed?: number;
//     noiseOpacity?: number;
// }) {
//     const canvasRef = useRef<HTMLCanvasElement | null>(null);
//     const angleRef = useRef(0);
//     const rafRef = useRef<number | null>(null);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;
//         const ctx = canvas.getContext("2d");
//         if (!ctx) return;

//         const resize = () => {
//             canvas.width = canvas.offsetWidth;
//             canvas.height = canvas.offsetHeight;
//         };
//         resize();
//         const ro = new ResizeObserver(resize);
//         ro.observe(canvas);

//         // Build a tiny noise texture once
//         const NOISE_SIZE = 128;
//         const noiseCanvas = document.createElement("canvas");
//         noiseCanvas.width = NOISE_SIZE;
//         noiseCanvas.height = NOISE_SIZE;
//         const nCtx = noiseCanvas.getContext("2d");
//         if (!nCtx) return;
//         const imgData = nCtx.createImageData(NOISE_SIZE, NOISE_SIZE);
//         for (let i = 0; i < imgData.data.length; i += 4) {
//             const v = (Math.random() * 255) | 0;
//             imgData.data[i] = v;
//             imgData.data[i + 1] = v;
//             imgData.data[i + 2] = v;
//             imgData.data[i + 3] = 255;
//         }
//         nCtx.putImageData(imgData, 0, 0);
//         const noisePattern = ctx.createPattern(noiseCanvas, "repeat");

//         const draw = () => {
//             const w = canvas.width;
//             const h = canvas.height;
//             if (!w || !h) { rafRef.current = requestAnimationFrame(draw); return; }

//             angleRef.current += speed;
//             const t = angleRef.current;

//             // Animated conic gradient with color stops shifting over time
//             const cx = w / 2 + Math.sin(t * 0.7) * w * 0.1;
//             const cy = h / 2 + Math.cos(t * 0.5) * h * 0.1;

//             const grad = ctx.createConicGradient(t, cx, cy);
//             const n = gradientColors.length;
//             gradientColors.forEach((c, i) => {
//                 grad.addColorStop(i / n, c);
//             });
//             grad.addColorStop(1, gradientColors[0]);

//             ctx.clearRect(0, 0, w, h);
//             ctx.fillStyle = grad;
//             ctx.fillRect(0, 0, w, h);

//             // Overlay noise
//             ctx.globalAlpha = noiseOpacity;
//             ctx.fillStyle = noisePattern || "";
//             ctx.fillRect(0, 0, w, h);
//             ctx.globalAlpha = 1;

//             rafRef.current = requestAnimationFrame(draw);
//         };

//         draw();
//         return () => {
//             cancelAnimationFrame(rafRef.current || 0);
//             ro.disconnect();
//         };
//     }, [gradientColors, speed, noiseOpacity]);

//     return (
//         <div className={`relative ${containerClassName}`} style={{ isolation: "isolate" }}>
//             <canvas
//                 ref={canvasRef}
//                 style={{
//                     position: "absolute",
//                     inset: 0,
//                     width: "100%",
//                     height: "100%",
//                     borderRadius: "inherit",
//                     zIndex: 0,
//                 }}
//             />
//             <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
//         </div>
//     );
// }

// export default NoiseBackground;