import { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = "",
}) => {
  // Close modal when pressing Escape key
  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if (e.key === "Escape") {
  //       onClose();
  //     }
  //   };

  //   if (isOpen) {
  //     document.addEventListener("keydown", handleKeyDown);
  //     document.body.style.overflow = "hidden";
  //   }

  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //     document.body.style.overflow = "";
  //   };
  // }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black opacity-66 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg shadow-xl relative max-w-md w-full max-h-[90vh] overflow-y-auto ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        {title && (
          <div className="border-b p-4">
            <h2 className="text-xl font-bold">{title}</h2>
          </div>
        )}

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
