import React, { useMemo, useState } from "react";
import styled from "@emotion/styled";
import { space, layout, color, typography, border } from "styled-system";
import { FilterBar } from "./filter";
import { SongTile } from "./tiles";
import { TopBar } from "./topbar";

// Simple container primitives to match existing style approach
const Column = styled.div(space, layout, color, typography, border, {
  display: "flex",
  flexDirection: "column",
});

const List = styled.div(
  space,
  layout,
  color,
  typography,
  border,
  ({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: 8,
    backgroundColor: "#F7F8FA",
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radii[1],
  })
);

export type Song = {
  title: string;
  artist: string;
  album: string;
  genre: string;
};

type SongsProps = {
  songs?: Song[];
  onEditSong?: (song: Song) => void;
  onDeleteSong?: (song: Song) => void;
  onNavigate?: (page: "home" | "statistics") => void;
} & React.ComponentProps<typeof Column>;

const DEFAULT_SONGS: Song[] = [
  {
    title: "Shake It Off",
    artist: "Taylor Swift",
    album: "1989",
    genre: "Pop",
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "Divide",
    genre: "Pop",
  },
  { title: "God's Plan", artist: "Drake", album: "Scorpion", genre: "Hip Hop" },
  {
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    genre: "Rock",
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    genre: "Electronic",
  },
  { title: "Perfect", artist: "Ed Sheeran", album: "Divide", genre: "Pop" },
];

export const ViewSongs: React.FC<SongsProps> = ({
  songs = DEFAULT_SONGS,
  onEditSong,
  onDeleteSong,
  onNavigate,
  ...props
}) => {
  const [genre, setGenre] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [query, setQuery] = useState("");

  const genres = useMemo(
    () => Array.from(new Set(songs.map((s: Song) => s.genre))).sort(),
    [songs]
  );
  const artists = useMemo(
    () => Array.from(new Set(songs.map((s: Song) => s.artist))).sort(),
    [songs]
  );
  const albums = useMemo(
    () => Array.from(new Set(songs.map((s: Song) => s.album))).sort(),
    [songs]
  );

  const filtered = useMemo(() => {
    return songs.filter((s: Song) => {
      const matchesGenre = !genre || s.genre === genre;
      const matchesArtist = !artist || s.artist === artist;
      const matchesAlbum = !album || s.album === album;
      const matchesQuery =
        !query ||
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.artist.toLowerCase().includes(query.toLowerCase()) ||
        s.album.toLowerCase().includes(query.toLowerCase());
      return matchesGenre && matchesArtist && matchesAlbum && matchesQuery;
    });
  }, [songs, genre, artist, album, query]);

  return (
    <Column {...props}>
      <TopBar
        currentPage="home"
        onNavigate={onNavigate || (() => {})}
        onAddSong={() => {}}
      />
      <FilterBar
        genres={genres}
        artists={artists}
        albums={albums}
        selectedGenre={genre}
        selectedArtist={artist}
        selectedAlbum={album}
        onGenreChange={setGenre}
        onArtistChange={setArtist}
        onAlbumChange={setAlbum}
        searchQuery={query}
        onSearchChange={setQuery}
        my={2}
      />

      <List p={2} bg={"#F7F8FA"}>
        {filtered.map((s: Song, idx: number) => (
          <SongTile
            key={`${s.title}-${idx}`}
            title={s.title}
            artist={s.artist}
            album={s.album}
            genre={s.genre}
            my={1}
            onClick={() => {}}
          />
        ))}
      </List>
    </Column>
  );
};

export default ViewSongs;
