"use client";
import React from "react";

export const Footer = () => {
  return (
    <div className="mt-auto p-4 text-center justify-center text-xs text-neutral-500 border-t border-neutral-100 bg-white">
      <span className="font-semibold">{new Date().getFullYear()} </span>
    </div>
  );
};
