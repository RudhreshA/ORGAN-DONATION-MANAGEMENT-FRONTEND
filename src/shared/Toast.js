import React, { useEffect } from "react";

const Toast = ({ type = "info", message, onClose }) => {
  useEffect(() => {
    const id = setTimeout(() => {
      if (onClose) onClose();
    }, 2500);

    // ✅ Cleanup properly (clears timeout only)
    return () => clearTimeout(id);
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-gray-500";

  return (
    <div
      className={`${bgColor} text-white px-4 py-2 rounded shadow-lg fixed top-4 right-4 z-50`}
    >
      {message}
    </div>
  );
};

export default Toast;
