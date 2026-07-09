import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`
        w-full max-w-[1440px] mx-auto
        px-5 sm:px-10 lg:px-20
        ${className}
      `}
    >
      {children}
    </div>
  );
}