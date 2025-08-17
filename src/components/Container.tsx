import React from "react";

export const Container = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <main className={`max-w-6xl w-full mx-auto py-24 px-6 md:px-12 ${className ?? ""}`}>
      {children}
    </main>
  );
};
