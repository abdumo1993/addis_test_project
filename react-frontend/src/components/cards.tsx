import styled from "@emotion/styled";
import {
  border,
  color,
  layout,
  space,
  typography,
} from "styled-system";

const Rectangle = styled.div(
  space,
  typography,
  color,
  layout,
  border,

  {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "left",
  },
  ({ theme, gradient }) =>
    gradient && {
      background: theme.gradients[gradient],
    }
);
const RectangleContent = styled.div(space, typography, color, layout, border, {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "left",
});

export const TextContent = styled.div(
  space,
  color,
  typography,
  layout,
  border,
  {
    width: "fit-content",
  }
);

type rectPropType = {
  title: string;
  subtitle: string;
} & React.ComponentProps<typeof Rectangle>;
export const RectCard = ({ title, subtitle, ...props }: rectPropType) => {
  return (
    <Rectangle gradient={"green"} p={4} borderRadius={1} {...props}>
      <RectangleContent>
        <TextContent fontSize={1} color={"textOnPrimary"}>
          {title}
        </TextContent>
        <TextContent fontSize={3} color={"textOnPrimary"}>
          {subtitle}
        </TextContent>
      </RectangleContent>
    </Rectangle>
  );
};

const Square = styled.div(
  space,
  typography,
  color,
  layout,
  border,
  {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: "1 1 0", // Equal growth, no basis to ensure equal width
    minWidth: 120, // Minimum width for responsiveness
  },
  ({ theme, gradient }) =>
    gradient && {
      background: theme.gradients[gradient],
    }
);


const SquareContent = styled.div(space, typography, color, layout, border, {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 8,
  width: "100%",

});

type squarePropType = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
} & React.ComponentProps<typeof Square>;
export const SquareCard = ({
  title,
  subtitle,
  icon,
  ...props
}: squarePropType) => {
  return (
    <Square
      gradient={"purple"}
      p={4}
      borderRadius={1}
      flex="1 1 200px" // allows growth, sets a minimum
      minWidth={120} 
      {...props}
    >
      <SquareContent  >
        <TextContent color={"textOnPrimary"}>{icon}</TextContent>
        <TextContent color={"textOnPrimary"}>{title}</TextContent>
        <TextContent color={"textOnPrimary"}>{subtitle}</TextContent>
      </SquareContent>
    </Square>
  );
};
