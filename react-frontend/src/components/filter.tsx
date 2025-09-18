import styled from "@emotion/styled";
import {
  space,
  layout,
  color,
  typography,
  border,
  flexbox,
} from "styled-system";
import React from "react";

// Primitives
const Row = styled.div(space, layout, color, typography, border, flexbox, {
  display: "flex",
  alignItems: "center",
  gap: 12,
});

const Label = styled.span(space, layout, color, typography, border, {
  fontSize: 12,
  color: "#6B7280",
});

const Select = styled.select(space, layout, color, typography, border, {
  appearance: "none",
  backgroundColor: "#F3F4F6",
  border: "1px solid #E5E7EB",
  borderRadius: 6,
  padding: "6px 28px 6px 10px",
  fontSize: 12,
  lineHeight: 1,
  backgroundImage:
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='%236B7280'><path d='M7 10l5 5 5-5'/></svg>\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 8px center",
});

const SearchWrapper = styled.div(space, layout, color, typography, border, {
  position: "relative",
  display: "flex",
  alignItems: "center",
});

const SearchInput = styled.input(space, layout, color, typography, border, {
  padding: "6px 10px 6px 28px",
  backgroundColor: "#F3F4F6",
  border: "1px solid #E5E7EB",
  borderRadius: 6,
  fontSize: 12,
});

const Icon = styled.span(space, layout, color, typography, border, {
  position: "absolute",
  left: 8,
  color: "#9CA3AF",
  display: "inline-flex",
  alignItems: "center",
});

type FilterBarProps = {
  genres: string[];
  artists: string[];
  albums: string[];
  selectedGenre?: string;
  selectedArtist?: string;
  selectedAlbum?: string;
  onGenreChange?: (value: string) => void;
  onArtistChange?: (value: string) => void;
  onAlbumChange?: (value: string) => void;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
} & React.ComponentProps<typeof Row>;

export const FilterBar: React.FC<FilterBarProps> = ({
  genres,
  artists,
  albums,
  selectedGenre = "",
  selectedArtist = "",
  selectedAlbum = "",
  onGenreChange,
  onArtistChange,
  onAlbumChange,
  searchQuery = "",
  onSearchChange,
  ...props
}) => {
  return (
    <Row justifyContent="space-between" width="100%" {...props}>
      <Row gap={8}>
        <Label>Filter by:</Label>
        <Select
          value={selectedGenre}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            onGenreChange && onGenreChange(e.target.value)
          }
        >
          <option value="">All Genres</option>
          {genres.map((g: string) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </Select>
        <Select
          value={selectedArtist}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            onArtistChange && onArtistChange(e.target.value)
          }
        >
          <option value="">All Artists</option>
          {artists.map((a: string) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </Select>
        <Select
          value={selectedAlbum}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            onAlbumChange && onAlbumChange(e.target.value)
          }
        >
          <option value="">All Albums</option>
          {albums.map((a: string) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </Select>
      </Row>

      <SearchWrapper>
        <Icon>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21l-4.35-4.35"
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="11" cy="11" r="7" stroke="#9CA3AF" strokeWidth="2" />
          </svg>
        </Icon>
        <SearchInput
          placeholder="Search songs..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onSearchChange && onSearchChange(e.target.value)
          }
        />
      </SearchWrapper>
    </Row>
  );
};

export default FilterBar;
