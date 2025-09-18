import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addNotification, removeNotification } from "../state/slices/uiSlice";
import type { NotificationPayload } from "../state/types/ui.types";

export const useToast = () => {
  const dispatch = useDispatch();

  const showToast = useCallback(
    (payload: NotificationPayload) => {
      dispatch(addNotification(payload));
    },
    [dispatch]
  );

  const showSuccess = useCallback(
    (message: string) => {
      showToast({ type: "success", message });
    },
    [showToast]
  );

  const showError = useCallback(
    (message: string) => {
      showToast({ type: "error", message });
    },
    [showToast]
  );

  const showWarning = useCallback(
    (message: string) => {
      showToast({ type: "warning", message });
    },
    [showToast]
  );

  const showInfo = useCallback(
    (message: string) => {
      showToast({ type: "info", message });
    },
    [showToast]
  );

  const removeToast = useCallback(
    (id: number) => {
      dispatch(removeNotification(id));
    },
    [dispatch]
  );

  return {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeToast,
  };
};

// Hook to automatically show error toasts when error state changes
export const useErrorToast = (error: string | null, errorType: string) => {
  const { showError } = useToast();

  useEffect(() => {
    if (error) {
      showError(`${errorType}: ${error}`);
    }
  }, [error, errorType, showError]);
};
