import React, { useCallback, useRef } from "react";
import styled from "@emotion/styled";
import { space, layout, color, typography, border } from "styled-system";
import { FilterBar } from "./filter";
import { Area, SongTile } from "./tiles";
import { TopBar } from "./topbar";
import type { Song } from "../state/types/songs.types";
import {
  selectSongsWithFilters,
  selectSongsLoading,
  useAppSelector,
  selectSongsHasMore,
  selectSongsLength,
  useAppDispatch,
  fetchSongsRequest,
  selectSongsQueryParams,
} from "../state";

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

type SongsProps = {
  onEditSong?: (song: Song) => void;
  onDeleteSong?: (song: Song) => void;
  onNavigate?: (page: "home" | "statistics") => void;
  onAddSong?: () => void;
} & React.ComponentProps<typeof Column>;

export const ViewSongs: React.FC<SongsProps> = ({
  onEditSong,
  onDeleteSong,
  onNavigate,
  onAddSong,
  ...props
}) => {
  const filtered = useAppSelector(selectSongsWithFilters);
  const loading = useAppSelector(selectSongsLoading);
  const hasMore = useAppSelector(selectSongsHasMore);
  const qParams = useAppSelector(selectSongsQueryParams);

  const songsLength = useAppSelector(selectSongsLength);
  const dispatch = useAppDispatch();

  // define the userREf and hte callback

  const observerRef = useRef<IntersectionObserver | null>(null);

  // callback
  const lastSongElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(fetchSongsRequest(qParams));
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, fetchSongsRequest]
  );
  console.log("loading", loading);
  return (
    <Column {...props}>
      <TopBar
        currentPage="home"
        onNavigate={onNavigate || (() => {})}
        onAddSong={onAddSong || (() => {})}
      />
      <FilterBar my={2} />

      <List p={2} bg={"#F7F8FA"}>
        {filtered.length !== 0 ? (
          filtered.map((s: Song, idx: number) => (
            <SongTile
              key={s.id}
              title={s.title}
              artist={s.artist}
              album={s.album}
              genre={s.genre}
              my={1}
              ref={idx === songsLength - 1 ? lastSongElementRef : null}
              onClick={() => {}}
              onEdit={() => onEditSong && onEditSong(s)}
              onDelete={() => onDeleteSong && onDeleteSong(s)}
            />
          ))
        ) : loading ? (
          <Area p={3} color={"muted"}>
            Songs Loading...
          </Area>
        ) : (
          <Area p={3} color={"muted"}>
            No Song Available
          </Area>
        )}
      </List>
    </Column>
  );
};

export default ViewSongs;
