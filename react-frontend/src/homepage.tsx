import { HomeSidebar } from "./components/sidebars";
import ViewSongs from "./components/viewSongs";

type HomepageProps = {
  onNavigate: (page: "home" | "statistics") => void;
  onNavigateToStats: (section: "genre" | "album" | "artist") => void;
};

export default function Homepage({
  onNavigate,
  onNavigateToStats,
}: HomepageProps) {
  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      <HomeSidebar onNavigateToStats={onNavigateToStats} />

      <div style={{ flex: 1 }}>
        <ViewSongs onNavigate={onNavigate} />
      </div>
    </div>
  );
}

