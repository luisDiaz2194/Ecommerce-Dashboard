import { useEffect } from "react";

function Toast({ message, type = "success", duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors = {
    success: "bg-green-500 border-green-700",
    error: "bg-red-500 border-red-700",
    warning: "bg-yellow-500 border-yellow-700",
    info: "bg-blue-500 border-blue-700",
  };

  return (
    <div className={`fixed top-5 right-5 z-50 w-80 text-white rounded-lg shadow-lg overflow-hidden border ${colors[type]}`}>
      <div className="px-4 py-3">
        <p className="font-semibold">{message}</p>
      </div>
      {/* Barra inferior */}
      <div
        className="h-1 bg-white"
        style={{
          animation: `shrink ${duration}ms linear forwards`,
        }}
      ></div>

      <style>
        {`
          @keyframes shrink {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}
      </style>
    </div>
  );
}

export default Toast;
