import styled from "@emotion/styled";
import {
  space,
  layout,
  color,
  typography,
  border,
  flexbox,
} from "styled-system";
import React, { useEffect, useState } from "react";

const ToastContainer = styled.div(
  space,
  layout,
  color,
  typography,
  border,
  flexbox,
  {
    position: "fixed",
    top: 20,
    right: 20,
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  }
);

const Toast = styled.div(
  space,
  layout,
  color,
  typography,
  border,
  flexbox,
  ({ type }: { type: "success" | "error" | "warning" | "info" }) => {
    const colors = {
      success: {
        bg: "#F0FDF4",
        border: "#BBF7D0",
        text: "#166534",
        icon: "✅",
      },
      error: {
        bg: "#FEF2F2",
        border: "#FECACA",
        text: "#DC2626",
        icon: "❌",
      },
      warning: {
        bg: "#FFFBEB",
        border: "#FED7AA",
        text: "#D97706",
        icon: "⚠️",
      },
      info: {
        bg: "#EFF6FF",
        border: "#BFDBFE",
        text: "#2563EB",
        icon: "ℹ️",
      },
    };

    const colorScheme = colors[type];

    return {
      backgroundColor: colorScheme.bg,
      border: `1px solid ${colorScheme.border}`,
      borderRadius: 8,
      padding: 12,
      display: "flex",
      alignItems: "center",
      gap: 8,
      minWidth: 300,
      maxWidth: 400,
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      animation: "slideIn 0.3s ease-out",
      "@keyframes slideIn": {
        from: {
          transform: "translateX(100%)",
          opacity: 0,
        },
        to: {
          transform: "translateX(0)",
          opacity: 1,
        },
      },
    };
  }
);

const ToastContent = styled.div(
  space,
  layout,
  color,
  typography,
  border,
  flexbox,
  {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  }
);

const ToastTitle = styled.div(space, layout, color, typography, border, {
  fontSize: 14,
  fontWeight: 600,
});

const ToastMessage = styled.div(space, layout, color, typography, border, {
  fontSize: 13,
  opacity: 0.9,
});

const CloseButton = styled.button(space, layout, color, typography, border, {
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: 16,
  opacity: 0.6,
  padding: 4,
  borderRadius: 4,
  "&:hover": {
    opacity: 1,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
});

type ToastType = "success" | "error" | "warning" | "info";

interface ToastData {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
}

interface ToastProps {
  toast: ToastData;
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastProps> = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onRemove(toast.id), 300); // Wait for animation
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onRemove(toast.id), 300);
  };

  const colors = {
    success: "#166534",
    error: "#DC2626",
    warning: "#D97706",
    info: "#2563EB",
  };

  const icons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  };

  return (
    <Toast
      type={toast.type}
      style={{
        transform: isVisible ? "translateX(0)" : "translateX(100%)",
        opacity: isVisible ? 1 : 0,
        transition: "all 0.3s ease-out",
      }}
    >
      <span style={{ fontSize: 16 }}>{icons[toast.type]}</span>
      <ToastContent>
        <ToastTitle style={{ color: colors[toast.type] }}>
          {toast.title}
        </ToastTitle>
        <ToastMessage style={{ color: colors[toast.type] }}>
          {toast.message}
        </ToastMessage>
      </ToastContent>
      <CloseButton onClick={handleClose}>×</CloseButton>
    </Toast>
  );
};

interface ToastManagerProps {
  toasts: ToastData[];
  onRemove: (id: string) => void;
}

export const ToastManager: React.FC<ToastManagerProps> = ({
  toasts,
  onRemove,
}) => {
  if (toasts.length === 0) return null;

  return (
    <ToastContainer>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </ToastContainer>
  );
};

export default ToastManager;
