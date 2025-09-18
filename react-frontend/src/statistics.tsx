import React, { useState } from "react";
import { StatisticsSidebar } from "./components/sidebars";
import ViewStats from "./components/veiwStats";
import { StatTile } from "./components/tiles";
import styled from "@emotion/styled";
import { space, layout, color, typography, border } from "styled-system";

const SectionTitle = styled.div(space, layout, color, typography, border, {
  fontSize: "14px",
  fontWeight: 600,
  marginBottom: "8px",
});

const GridContainer = styled.div(space, layout, color, typography, border, {
  backgroundColor: "#F7F8FA",
  border: "1px solid #e0e0e0",
  borderRadius: "4px",
  padding: "8px",
});

const Grid = styled.div(space, layout, color, typography, border, {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
});

type StatisticsProps = {
  onNavigate: (page: "home" | "statistics") => void;
  initialSection: "genre" | "album" | "artist";
  onNavigateToHome: () => void;
};

export default function Statistics({
  onNavigate,
  initialSection,
  onNavigateToHome,
}: StatisticsProps) {
  const [activeSection, setActiveSection] = useState<
    "genre" | "album" | "artist"
  >(initialSection);

  const renderContentSection = () => {
    switch (activeSection) {
      case "genre":
        return (
          <>
            <SectionTitle>Songs by Genre</SectionTitle>
            <GridContainer>
              <Grid>
                <StatTile
                  label="Pop"
                  subtitle="Most popular genre"
                  value={342}
                  unit="songs"
                />
                <StatTile
                  label="Rock"
                  subtitle="Classic genre"
                  value={289}
                  unit="songs"
                />
                <StatTile
                  label="Hip Hop"
                  subtitle="Urban beats"
                  value={201}
                  unit="songs"
                />
                <StatTile
                  label="Electronic"
                  subtitle="Digital sounds"
                  value={156}
                  unit="songs"
                />
              </Grid>
            </GridContainer>
          </>
        );
      case "album":
        return (
          <>
            <SectionTitle>Songs by Album</SectionTitle>
            <GridContainer>
              <Grid>
                <StatTile
                  label="1989"
                  subtitle="Taylor Swift"
                  value={45}
                  unit="songs"
                />
                <StatTile
                  label="Divide"
                  subtitle="Ed Sheeran"
                  value={32}
                  unit="songs"
                />
                <StatTile
                  label="After Hours"
                  subtitle="The Weeknd"
                  value={28}
                  unit="songs"
                />
                <StatTile
                  label="Scorpion"
                  subtitle="Drake"
                  value={25}
                  unit="songs"
                />
              </Grid>
            </GridContainer>
          </>
        );
      case "artist":
        return (
          <>
            <SectionTitle>Artists Overview</SectionTitle>
            <GridContainer>
              <Grid>
                <StatTile
                  label="Taylor Swift"
                  subtitle="Pop artist • 156 songs"
                  value={23}
                  unit="albums"
                />
                <StatTile
                  label="Ed Sheeran"
                  subtitle="Folk-pop artist • 134 songs"
                  value={19}
                  unit="albums"
                />
                <StatTile
                  label="Drake"
                  subtitle="Hip-hop artist • 98 songs"
                  value={17}
                  unit="albums"
                />
                <StatTile
                  label="The Weeknd"
                  subtitle="R&B artist • 87 songs"
                  value={15}
                  unit="albums"
                />
              </Grid>
            </GridContainer>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      <StatisticsSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <div style={{ flex: 1 }}>
        <ViewStats
          contentSection={renderContentSection()}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
}
