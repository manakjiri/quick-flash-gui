import React, { forwardRef, useImperativeHandle } from 'react';
import { toast, ToastContainer, ToastContent, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastType = 'success' | 'info' | 'error' | 'warning';

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface ShowToastProps {
  type: ToastType;
  message: string;
  duration?: number;
  action?: ToastAction;
}

const ToastManager = forwardRef((props, ref) => {
  // Expose the showToast function via ref
  useImperativeHandle(ref, () => ({
    showToast: ({ type, message, duration = 5000, action }: ShowToastProps) => {
      const toastOptions: ToastOptions = {
        type,
        autoClose: duration,
        hideProgressBar: false,
        position: 'bottom-center',
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      };

      if (action) {
        toast(
          ({ closeToast }) => (
            <div>
              {message}
              <button
                onClick={() => {
                  action.onClick();
                  closeToast();
                }}
                style={{
                  marginLeft: '10px',
                  padding: '5px 10px',
                  backgroundColor: '#f0f0f0',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                {action.label}
              </button>
            </div>
          ),
          toastOptions
        );
      } else {
        toast(message, toastOptions);
      }
    },
  }));

  return <ToastContainer />;
});

export default ToastManager;
