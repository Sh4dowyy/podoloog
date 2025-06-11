"use client";
import React from "react";

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-sage-300/30">
      <div className="glass-effect p-6 text-center text-sm text-sage-700">
        <div className="max-w-6xl mx-auto">
          <p className="font-medium">
            <span className="text-sage-800">© {new Date().getFullYear()}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
