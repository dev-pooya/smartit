import { cn } from "@/lib/utils";
import React from "react";

const LaravelSecurityRadar = ({ className }) => {
  const features = [
    { label: "احراز هویت", value: 90 },
    { label: "رمزنگاری", value: 85 },
    { label: "CSRF", value: 100 },
    { label: "XSS", value: 95 },
    { label: "Injection", value: 100 },
  ];

  const max = 100;
  const angleSlice = (2 * Math.PI) / features.length;
  const center = 150;
  const maxRadius = 150;
  const labelRadius = 145; // Adjust as needed (try 160–170 for larger screens)
  const points = features
    .map((f, i) => {
      const angle = i * angleSlice - Math.PI / 2;
      const radius = (f.value / max) * (maxRadius - 30);
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className={cn("relative w-[300px] h-[300px] mx-auto", className)}>
      <svg viewBox="0 0 300 300" className="text-sky-500">
        {/* Base web */}
        {[20, 40, 60, 80, 100].map((r) => (
          <polygon
            key={r}
            points={features
              .map((f, i) => {
                const angle = i * angleSlice - Math.PI / 2;
                const radius = (r / max) * (maxRadius - 30);
                const x = center + radius * Math.cos(angle);
                const y = center + radius * Math.sin(angle);
                return `${x},${y}`;
              })
              .join(" ")}
            fill="none"
            stroke="#0ea5e9"
            strokeOpacity={0.2}
          />
        ))}

        {/* Data polygon */}
        <polygon
          points={points}
          fill="url(#gradient)"
          stroke="#0ea5e9"
          strokeWidth="2"
          className="transition-all duration-700"
        />
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>
      {/* Labels */}
      {features.map((f, i) => {
        const angle = i * angleSlice - Math.PI / 2;
        const x = center + labelRadius * Math.cos(angle);
        const y = center + labelRadius * Math.sin(angle);
        return (
          <span
            key={i}
            className="absolute text-sm font-medium text-gray-400 dark:text-gray-300"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {f.label}
          </span>
        );
      })}
    </div>
  );
};

export default LaravelSecurityRadar;
