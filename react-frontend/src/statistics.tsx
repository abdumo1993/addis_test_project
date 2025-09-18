import { useState } from "react";
import { StatisticsSidebar } from "./components/sidebars";
import ViewStats from "./components/veiwStats";
import { Area, StatTile } from "./components/tiles";
import styled from "@emotion/styled";
import { space, layout, color, typography, border } from "styled-system";
import {
  selectSongAndAlbum,
  selectAlbumStats,
  selectGenreStats,
  selectStatLoading,
  useAppSelector,
} from "./state";

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
}: StatisticsProps) {
  const [activeSection, setActiveSection] = useState<
    "genre" | "album" | "artist"
  >(initialSection);

  const genres = useAppSelector(selectGenreStats);
  const albums = useAppSelector(selectAlbumStats);
  const artists = useAppSelector(selectSongAndAlbum);
  const loading = useAppSelector(selectStatLoading);

  const renderContentSection = () => {
    switch (activeSection) {
      case "genre":
        return (
          <>
            <SectionTitle>Songs by Genre</SectionTitle>
            <GridContainer>
              <Grid>
                {genres.length !== 0 ? (
                  genres.map((elem, idx) => (
                    <StatTile
                      label={elem.genre}
                      // subtitle="Most popular genre"
                      key={idx}
                      value={elem.count}
                      unit="songs"
                    />
                  ))
                ) : loading ? (
                  <Area p={3} color={"muted"}>
                    genres Loading...
                  </Area>
                ) : (
                  <Area p={3} color={"muted"}>
                    no genre available
                  </Area>
                )}
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
                {albums.length !== 0 ? (
                  albums.map((elem, _) => (
                    <StatTile
                      label={elem.album}
                      subtitle={elem.artist}
                      value={elem.count}
                      unit="songs"
                    />
                  ))
                ) : loading ? (
                  <Area p={3} color={"muted"}>
                    albums Loading...
                  </Area>
                ) : (
                  <Area p={3} color={"muted"}>
                    no album available
                  </Area>
                )}
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
                {artists.length !== 0 ? (
                  artists.map((elem, idx) => (
                    <StatTile
                      key={idx}
                      label={elem.artist}
                      subtitle={`${elem.songs} songs`}
                      value={elem.album}
                      unit="albums"
                    />
                  ))
                ) : loading ? (
                  <Area p={3} color={"muted"}>
                    artists Loading...
                  </Area>
                ) : (
                  <Area p={3} color={"muted"}>
                    no artist available
                  </Area>
                )}
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
