import React, { forwardRef, useImperativeHandle } from "react";
import { toast, ToastContainer, ToastContent, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "success" | "info" | "error" | "warning";

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface ShowToastProps {
  type: ToastType;
  message: string;
  duration?: number;
  action?: ToastAction;
  onAutoClose?: () => void; // New optional callback
}

const ToastManager = forwardRef((props, ref) => {
  // Expose the showToast function via ref
  useImperativeHandle(ref, () => ({
    showToast: ({ type, message, duration = 5000, action, onAutoClose }: ShowToastProps) => {
      let manuallyClosed = false; // Flag to track manual closure

      const toastOptions: ToastOptions = {
        type,
        autoClose: duration,
        hideProgressBar: false,
        position: "bottom-center",
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        onClose: (props) => {
          // Check if the toast was auto-closed (not dismissed manually)
          if (!manuallyClosed && onAutoClose) {
            onAutoClose();
          }
        },
      };

      if (action) {
        toast(
          ({ closeToast }) => (
            <div>
              {message}
              <button
                onClick={() => {
                  /*
                  we are clicking on a button, that likely Undoes
                  Therefore, we ARE closing the toast, but we do not want to trigger the
                  */
                  manuallyClosed = true;
                  action.onClick();
                  closeToast();
                }}
                style={{
                  marginLeft: "10px",
                  padding: "5px 10px",
                  backgroundColor: "#f0f0f0",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {action.label}
              </button>
            </div>
          ),
          toastOptions,
        );
      } else {
        toast(message, toastOptions);
      }
    },
  }));

  return <ToastContainer />;
});

export default ToastManager;
