// leading icon button and text button

import styled from "@emotion/styled";
import { color, layout, space, typography, border } from "styled-system";
import { Area } from "./tiles";

const IconButton = styled.button(space, color, layout, typography, border, {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
});

type IconTextButtonProps = {
  icon: React.ReactNode;
  text: string;
  iconPosition?: "left" | "right";
  onClick?: () => void;
} & React.ComponentProps<typeof IconButton>;

export const IconTextButton = ({
  icon,
  text,
  iconPosition,
  onClick,
  ...props
}: IconTextButtonProps) => {
  return (
    <IconButton
      onClick={onClick}
      bg={"primary"}
      p={1}
      border={"none"}
      borderRadius={1}
      {...props}
    >
      {iconPosition === "left" && icon}

      <Area color="textOnPrimary" font={"body"} fontSize={2}>
        {text}
      </Area>

      {iconPosition === "right" && <Area>{icon}</Area>}
    </IconButton>
  );
};
export const TextButton = ({ text }: { text: string }) => {
  return <div>{text}</div>;
};

// Secondary (ghost) button for Cancel
export const SecondaryButton = styled.button(
  space,
  color,
  layout,
  typography,
  border,
  {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "8px 12px",
    backgroundColor: "#F3F4F6",
    color: "#111827",
    border: "1px solid #E5E7EB",
    borderRadius: 8,
  }
);
