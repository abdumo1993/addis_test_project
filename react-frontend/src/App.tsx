import { lightTheme } from "./theme";
import { ThemeProvider } from "@emotion/react";
import { useState } from "react";
import Homepage from "./homepage";
import Statistics from "./statistics";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "statistics">("home");
  const [selectedStatsSection, setSelectedStatsSection] = useState<
    "genre" | "album" | "artist" | null
  >(null);

  const handleNavigateToStats = (section: "genre" | "album" | "artist") => {
    setSelectedStatsSection(section);
    setCurrentPage("statistics");
  };

  const handleNavigateToHome = () => {
    setSelectedStatsSection(null);
    setCurrentPage("home");
  };

  return (
    <ThemeProvider theme={lightTheme}>
      {currentPage === "home" && (
        <Homepage
          onNavigate={setCurrentPage}
          onNavigateToStats={handleNavigateToStats}
        />
      )}
      {currentPage === "statistics" && (
        <Statistics
          onNavigate={setCurrentPage}
          initialSection={selectedStatsSection || "genre"}
          onNavigateToHome={handleNavigateToHome}
        />
      )}
    </ThemeProvider>
  );
}
