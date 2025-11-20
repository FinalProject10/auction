"use client";
import React, { useState, useRef, useEffect } from "react";

interface InfoTooltipProps {
  content: string | React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
  iconSize?: "sm" | "md" | "lg";
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({
  content,
  position = "top",
  className = "",
  iconSize = "md",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate tooltip position to avoid viewport edges
  useEffect(() => {
    if (isVisible && tooltipRef.current && containerRef.current) {
      const tooltip = tooltipRef.current;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Reset any previous positioning
      tooltip.style.left = "";
      tooltip.style.right = "";
      tooltip.style.top = "";
      tooltip.style.bottom = "";
      tooltip.style.transform = "";

      // Adjust horizontal position if tooltip goes off screen
      if (position === "top" || position === "bottom") {
        const leftSpace = rect.left;
        const rightSpace = viewportWidth - rect.right;
        const tooltipWidth = tooltipRect.width;
        const centerX = rect.left + rect.width / 2;

        // On mobile, ensure tooltip doesn't overflow
        if (viewportWidth < 640) {
          // Mobile: align to container, but keep within viewport
          if (centerX < tooltipWidth / 2) {
            tooltip.style.left = "0";
            tooltip.style.transform = "translateX(0)";
          } else if (centerX > viewportWidth - tooltipWidth / 2) {
            tooltip.style.right = "0";
            tooltip.style.transform = "translateX(0)";
          } else {
            tooltip.style.left = "50%";
            tooltip.style.transform = "translateX(-50%)";
          }
        } else {
          // Desktop: center on container
          if (leftSpace < tooltipWidth / 2) {
            tooltip.style.left = "0";
            tooltip.style.transform = "translateX(0)";
          } else if (rightSpace < tooltipWidth / 2) {
            tooltip.style.right = "0";
            tooltip.style.transform = "translateX(0)";
          } else {
            tooltip.style.left = "50%";
            tooltip.style.transform = "translateX(-50%)";
          }
        }
      }

      // Adjust vertical position if tooltip goes off screen
      if (position === "left" || position === "right") {
        const topSpace = rect.top;
        const bottomSpace = viewportHeight - rect.bottom;
        const tooltipHeight = tooltipRect.height;

        if (topSpace < 10) {
          tooltip.style.top = "0";
          tooltip.style.transform = "translateY(0)";
        } else if (bottomSpace < 10) {
          tooltip.style.bottom = "0";
          tooltip.style.transform = "translateY(0)";
        }
      }
    }
  }, [isVisible, position]);

  const iconSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const positionClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-gray-900 border-l-transparent border-r-transparent border-b-transparent border-t-4",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 border-l-transparent border-r-transparent border-t-transparent border-b-4",
    left: "left-full top-1/2 -translate-y-1/2 border-l-gray-900 border-t-transparent border-b-transparent border-r-transparent border-l-4",
    right: "right-full top-1/2 -translate-y-1/2 border-r-gray-900 border-t-transparent border-b-transparent border-l-transparent border-r-4",
  };

  return (
    <div
      ref={containerRef}
      className={`group relative inline-flex items-center ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span
        className={`cursor-help text-blue-500 hover:text-blue-700 font-bold ${iconSizes[iconSize]} transition-colors`}
        aria-label="More information"
      >
        ?
      </span>

      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute ${positionClasses[position]} z-50 w-64 sm:w-80 max-w-[90vw] p-3 bg-gray-900 text-white text-xs sm:text-sm rounded-lg shadow-xl transition-all duration-200 pointer-events-none`}
          role="tooltip"
          style={{ opacity: isVisible ? 1 : 0, visibility: isVisible ? "visible" : "hidden" }}
        >
          <div className="relative">
            {typeof content === "string" ? (
              <p className="leading-relaxed">{content}</p>
            ) : (
              <div className="leading-relaxed">{content}</div>
            )}
          </div>
          <div className={`absolute ${arrowClasses[position]} w-0 h-0`}></div>
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;

