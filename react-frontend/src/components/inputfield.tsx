import styled from "@emotion/styled";
import React from "react";
import {
  space,
  layout,
  color,
  typography,
  border,
  flexbox,
} from "styled-system";

const Column = styled.div(space, layout, color, typography, border, flexbox, {
  display: "flex",
  flexDirection: "column",
  gap: 6,
});

const LabelRow = styled.div(space, layout, color, typography, border, flexbox, {
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontSize: 12,
  color: "#6366F1",
});

const InputEl = styled.input(space, layout, color, typography, border, {
  width: "100%",
  boxSizing: "border-box",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid",
  borderColor: "#6366F1",
  backgroundColor: "#ffffff",
  fontSize: 12,
  outline: "none",
  transition: "box-shadow 120ms ease, border-color 120ms ease",
  boxShadow: "0 0 0 1px rgba(99,102,241,0.4)",
  ":focus": {
    boxShadow: "0 0 0 2px rgba(99,102,241,0.6)",
    borderColor: "#6366F1",
  },
  ":placeholder": {
    color: "#9CA3AF",
  },
});

type InputFieldProps = {
  label: string;
  icon?: React.ReactNode;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
} & React.ComponentProps<typeof Column>;

export const InputField: React.FC<InputFieldProps> = ({
  label,
  icon,
  placeholder = "",
  value,
  onChange,
  ...props
}) => {
  return (
    <Column {...props}>
      <LabelRow>
        {icon}
        <span>{label}</span>
      </LabelRow>
      <InputEl
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange && onChange(e.target.value)
        }
      />
    </Column>
  );
};

export default InputField;
