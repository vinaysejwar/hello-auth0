import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface LoaderProps {
  className?: string;
  size?: number;
}

const Loader: React.FC<LoaderProps> = ({ className = "", size }) => {
  return (
    <div className={`text-center ${className}`}>
      <ClipLoader size={size} color="#2563EA" />
    </div>
  );
};

export default Loader;

