'use client';

import React from 'react';

export const FloralDecorations = () => {
  return (
    <>
      {/* Top Right Poppy */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full transform rotate-12"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Large Poppy */}
          <path
            d="M80 60 Q100 40, 120 60 Q140 80, 120 100 Q100 120, 80 100 Q60 80, 80 60"
            fill="url(#poppy1)"
            opacity="0.8"
          />
          {/* Petals */}
          <path
            d="M90 70 Q110 50, 130 70 Q120 90, 100 85 Q80 80, 90 70"
            fill="url(#poppy2)"
            opacity="0.6"
          />
          {/* Center */}
          <circle cx="100" cy="80" r="8" fill="#2d1810" opacity="0.4"/>
          {/* Stem */}
          <path
            d="M100 100 Q105 130, 110 160"
            stroke="url(#stem)"
            strokeWidth="3"
            fill="none"
          />
          
          <defs>
            <radialGradient id="poppy1" cx="0.3" cy="0.3">
              <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.9"/>
              <stop offset="70%" stopColor="#ff4500" stopOpacity="0.7"/>
              <stop offset="100%" stopColor="#cc3300" stopOpacity="0.5"/>
            </radialGradient>
            <radialGradient id="poppy2" cx="0.4" cy="0.4">
              <stop offset="0%" stopColor="#ff8c69" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#ff6347" stopOpacity="0.4"/>
            </radialGradient>
            <linearGradient id="stem" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8fbc8f"/>
              <stop offset="100%" stopColor="#556b2f"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Bottom Left Small Flowers */}
      <div className="absolute bottom-0 left-0 w-24 h-24 opacity-15 pointer-events-none">
        <svg
          viewBox="0 0 150 150"
          className="w-full h-full transform -rotate-12"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Small poppy 1 */}
          <path
            d="M30 40 Q40 30, 50 40 Q60 50, 50 60 Q40 70, 30 60 Q20 50, 30 40"
            fill="url(#smallPoppy1)"
          />
          {/* Small poppy 2 */}
          <path
            d="M70 60 Q80 50, 90 60 Q100 70, 90 80 Q80 90, 70 80 Q60 70, 70 60"
            fill="url(#smallPoppy2)"
          />
          {/* Leaves */}
          <path
            d="M40 70 Q50 80, 45 90 Q35 85, 40 70"
            fill="url(#leaf)"
          />
          
          <defs>
            <radialGradient id="smallPoppy1">
              <stop offset="0%" stopColor="#ff7f50"/>
              <stop offset="100%" stopColor="#ff4500"/>
            </radialGradient>
            <radialGradient id="smallPoppy2">
              <stop offset="0%" stopColor="#ffa07a"/>
              <stop offset="100%" stopColor="#ff6347"/>
            </radialGradient>
            <linearGradient id="leaf">
              <stop offset="0%" stopColor="#9acd32"/>
              <stop offset="100%" stopColor="#6b8e23"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Center Floating Elements */}
      <div className="absolute top-1/3 right-1/4 w-16 h-16 opacity-10 pointer-events-none animate-float">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 30 Q30 20, 40 30 Q50 40, 40 50 Q30 60, 20 50 Q10 40, 20 30"
            fill="url(#floatingPoppy)"
          />
          <defs>
            <radialGradient id="floatingPoppy">
              <stop offset="0%" stopColor="#ff8c69"/>
              <stop offset="100%" stopColor="#ff6347"/>
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Butterfly */}
      <div className="absolute top-1/4 left-3/4 w-12 h-12 opacity-20 pointer-events-none animate-float-slow">
        <svg
          viewBox="0 0 80 80"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Butterfly wings */}
          <path
            d="M25 30 Q15 20, 25 15 Q35 20, 30 30"
            fill="url(#wing1)"
          />
          <path
            d="M50 30 Q60 20, 50 15 Q40 20, 45 30"
            fill="url(#wing2)"
          />
          <path
            d="M25 45 Q15 55, 25 60 Q35 55, 30 45"
            fill="url(#wing3)"
          />
          <path
            d="M50 45 Q60 55, 50 60 Q40 55, 45 45"
            fill="url(#wing4)"
          />
          {/* Body */}
          <line x1="37.5" y1="15" x2="37.5" y2="60" stroke="#8b4513" strokeWidth="2"/>
          
          <defs>
            <linearGradient id="wing1">
              <stop offset="0%" stopColor="#ffd700"/>
              <stop offset="100%" stopColor="#ff8c00"/>
            </linearGradient>
            <linearGradient id="wing2">
              <stop offset="0%" stopColor="#ffd700"/>
              <stop offset="100%" stopColor="#ff8c00"/>
            </linearGradient>
            <linearGradient id="wing3">
              <stop offset="0%" stopColor="#90ee90"/>
              <stop offset="100%" stopColor="#32cd32"/>
            </linearGradient>
            <linearGradient id="wing4">
              <stop offset="0%" stopColor="#90ee90"/>
              <stop offset="100%" stopColor="#32cd32"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
};

export const WatercolorBorder = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Top watercolor splash */}
      <div className="absolute -top-4 left-1/4 w-32 h-8 opacity-5">
        <svg
          viewBox="0 0 200 50"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 25 Q50 10, 100 25 Q150 40, 200 25 L200 50 L0 50 Z"
            fill="url(#watercolor1)"
          />
          <defs>
            <linearGradient id="watercolor1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.3"/>
              <stop offset="50%" stopColor="#ff8c69" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#ffa07a" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Bottom watercolor splash */}
      <div className="absolute -bottom-4 right-1/3 w-40 h-10 opacity-5">
        <svg
          viewBox="0 0 240 60"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 30 Q60 15, 120 30 Q180 45, 240 30 L240 0 L0 0 Z"
            fill="url(#watercolor2)"
          />
          <defs>
            <linearGradient id="watercolor2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#9acd32" stopOpacity="0.2"/>
              <stop offset="50%" stopColor="#8fbc8f" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#6b8e23" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}; 