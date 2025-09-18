import styled from "@emotion/styled";
import React from "react";
import { space, layout, color, typography, border } from "styled-system";
import { RectCard } from "./cards";
import { BadgeTile, NavTile, Area } from "./tiles";

const Wrapper = styled.aside(space, layout, color, typography, border, {
  width: 260,
  padding: 12,
});

const SectionTitle = styled.div(space, layout, color, typography, border, {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

type SidebarProps = React.ComponentProps<typeof Wrapper> & {
  children?: React.ReactNode;
};

export const Sidebar: React.FC<SidebarProps> = ({ children, ...props }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

// Statistics page sidebar
type StatisticsSidebarProps = React.ComponentProps<typeof Wrapper> & {
  activeSection?: "genre" | "album" | "artist";
  onSectionChange?: (section: "genre" | "album" | "artist") => void;
};

export const StatisticsSidebar: React.FC<StatisticsSidebarProps> = ({
  activeSection = "genre",
  onSectionChange,
  ...props
}) => {
  return (
    <Sidebar {...props}>
      <Area fontSize={3} fontWeight={"bold"} mb={2}>
        Songs App
      </Area>

      <SectionTitle
        fontSize={1}
        color={"muted"}
        fontWeight={"bold"}
        textTransform={"uppercase"}
        letterSpacing={"0.4px"}
        mt={3}
        mb={2}
      >
        Statistics
      </SectionTitle>
      <NavTile
        label="Songs by Genre"
        active={activeSection === "genre"}
        onClick={() => onSectionChange?.("genre")}
        my={1}
      />
      <NavTile
        label="Songs by Album"
        active={activeSection === "album"}
        onClick={() => onSectionChange?.("album")}
        my={1}
      />
      <NavTile
        label="Artists Overview"
        active={activeSection === "artist"}
        onClick={() => onSectionChange?.("artist")}
        my={1}
      />

      <SectionTitle
        fontSize={1}
        color={"muted"}
        fontWeight={"bold"}
        textTransform={"uppercase"}
        letterSpacing={"0.4px"}
        mt={3}
        mb={2}
      >
        Quick Stats
      </SectionTitle>
      <RectCard title="Total Songs" subtitle="1,247" my={2} />
      <RectCard title="Total Albums" subtitle="156" my={2} />
      <RectCard title="Total Genres" subtitle="12" my={2} />
      <RectCard title="Total Artists" subtitle="89" my={2} />
    </Sidebar>
  );
};

// Home/Library page sidebar
type HomeSidebarProps = React.ComponentProps<typeof Wrapper> & {
  onNavigateToStats?: (section: "genre" | "album" | "artist") => void;
};

export const HomeSidebar: React.FC<HomeSidebarProps> = ({
  onNavigateToStats,
  ...props
}) => {
  return (
    <Sidebar {...props}>
      <Area fontSize={3} fontWeight={"bold"} mb={2}>
        Songs App
      </Area>

      <RectCard title="Total Songs" subtitle="1,247" my={2} />
      <RectCard title="Total Albums" subtitle="156" my={2} />

      <SectionTitle
        fontSize={0}
        color={"muted"}
        fontWeight={"bold"}
        textTransform={"uppercase"}
        letterSpacing={"0.4px"}
        mt={3}
        mb={2}
      >
        Top Genres
        <Area
          as="span"
          ml={2}
          color={"primary"}
          style={{ cursor: "pointer" }}
          onClick={() => onNavigateToStats?.("genre")}
        >
          See more
        </Area>
      </SectionTitle>
      <BadgeTile label="Pop" count={342} my={1} />
      <BadgeTile label="Rock" count={289} my={1} />
      <BadgeTile label="Hip Hop" count={201} my={1} />
      <BadgeTile label="Electronic" count={156} my={1} />

      <SectionTitle
        fontSize={0}
        color={"muted"}
        fontWeight={"bold"}
        textTransform={"uppercase"}
        letterSpacing={"0.4px"}
        mt={3}
        mb={2}
      >
        Top Artists{" "}
        <Area
          as="span"
          ml={2}
          color={"primary"}
          style={{ cursor: "pointer" }}
          onClick={() => onNavigateToStats?.("artist")}
        >
          See more
        </Area>
      </SectionTitle>
      <BadgeTile label="Taylor Swift" count={23} my={1} />
      <BadgeTile label="Ed Sheeran" count={19} my={1} />
      <BadgeTile label="Drake" count={17} my={1} />
    </Sidebar>
  );
};

export default Sidebar;
import type { PropsWithChildren } from "react";

export const SideBar = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};
