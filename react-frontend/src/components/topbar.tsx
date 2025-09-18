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
import { Area } from "./tiles";
import { IconTextButton } from "./buttons";

const Bar = styled.div(
  space,
  layout,
  color,
  typography,
  border,
  flexbox,
  ({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    height: "48px",
    borderBottom: `1px solid ${theme.colors.border}`,
  })
);

const Left = styled.div(space, layout, color, typography, border, {
  fontWeight: 700,
});

const Center = styled.div(space, layout, color, typography, border, {
  fontWeight: 600,
});

const Right = styled.div(space, layout, color, typography, border, flexbox, {
  display: "flex",
  alignItems: "center",
  gap: 12,
});

const NavLink = styled.span(
  space,
  layout,
  color,
  typography,
  border,
  ({ theme, active }: any) => ({
    cursor: "pointer",
    color: active ? theme.colors.primary : theme.colors.muted,
    fontWeight: active ? theme.fontWeights.bold : theme.fontWeights.normal,
  })
);

type Page =  "statistics" | "home";

type TopBarProps = {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onAddSong: () => void;
};

export const TopBar: React.FC<TopBarProps> = ({
  currentPage,
  onNavigate,
  onAddSong,
}) => {
  return (
    <Bar>
      <Center>
        {currentPage === "home" ? "Songs Library" : "Statistics Dashboard"}
      </Center>
      <Right>
        {currentPage === "home" ? (
          <IconTextButton
            px={3}
            py={1}
            text={"Add Song"}
            iconPosition={"left"}
            icon={
              <Area fontSize={4} color={"textOnPrimary"}>
                +
              </Area>
            }
            bg={"primary"}
            color={"textOnPrimary"}
            onClick={onAddSong}
          />
        ) : (
          <Area fontSize={1}>
            <NavLink
              mr={3}
              active={currentPage === ("home" as Page)}
              onClick={() => onNavigate("home")}
            >
              Library
            </NavLink>
            <NavLink
              active={currentPage === ("statistics" as Page)}
              onClick={() => onNavigate("statistics")}
            >
              Statistics
            </NavLink>
          </Area>
        )}
      </Right>
    </Bar>
  );
};

export default TopBar;
