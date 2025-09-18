import React from "react";
import styled from "@emotion/styled";
import {
  space,
  layout,
  color,
  typography,
  border,
  flexbox,
} from "styled-system";
import { SquareCard, TextContent } from "./cards";
import { StatTile } from "./tiles";
import { TopBar } from "./topbar";

const Column = styled.div(space, layout, color, typography, border, {
  display: "flex",
  flexDirection: "column",
});

const Row = styled.div(space, layout, color, typography, border, flexbox, {
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  gap: 12,
});

const RowContainer = styled.div(space, layout, border, {
  display: "flex",
  justifyContent: "space-between",
  gap: "12px", // reduced gap to prevent overflow
  flexWrap: "wrap", // optional, wraps on smaller screens
  width: "100%",
  padding: "16px",
  maxWidth: "100%", // ensure it doesn't exceed container
  boxSizing: "border-box", // include padding in width calculation
});

const Grid = styled.div(space, layout, color, typography, border, {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
});

const GridContainer = styled.div(
  space,
  layout,
  color,
  typography,
  border,
  ({ theme }) => ({
    backgroundColor: "#F7F8FA",
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radii[1],
  })
);

type ViewStatsProps = {
  contentSection?: React.ReactNode;
  onNavigate: (page: "home" | "statistics") => void;
};

export const ViewStats: React.FC<ViewStatsProps> = ({
  contentSection,
  onNavigate,
}) => {
  return (
    <Column>
      <TopBar
        currentPage="statistics"
        onNavigate={onNavigate}
        onAddSong={() => {}}
      />

      <RowContainer mb={3}>
        <SquareCard title="1,247" subtitle="Total Songs" icon={"♪"} />
        <SquareCard title="156" subtitle="Total Albums" icon={"💿"} />
        <SquareCard title="12" subtitle="Total Genres" icon={"🏷️"} />
        <SquareCard title="89" subtitle="Total Artists" icon={"👥"} />
      </RowContainer>

      {contentSection}
    </Column>
  );
};

export default ViewStats;
