import styled from "@emotion/styled";
import {
  space,
  layout,
  color,
  typography,
  border,
  flexbox,
} from "styled-system";
import React, { useState, useEffect } from "react";
import InputField from "./inputfield";
import { IconTextButton, SecondaryButton } from "./buttons";
import tagIcon from "../assets/tag.svg";
import artistIcon from "../assets/artist.svg";
import cdIcon from "../assets/cd.svg";
import type { Song, UpdateSongPayload } from "../state/types/songs.types";
import { updateSongRequest, closeEditSongModal } from "../state";
import { useDispatch } from "react-redux";

const Modal = styled.div(space, layout, color, typography, border, {
  backgroundColor: "#ffffff",
  borderRadius: 12,
  padding: 16,
  width: 420,
  maxWidth: "90vw",
  boxSizing: "border-box",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
});

const Header = styled.div(space, layout, color, typography, border, flexbox, {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 8,
});

const Title = styled.div(space, layout, color, typography, border, flexbox, {
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 16,
  color: "#111827",
  fontWeight: 700,
});

const Sub = styled.div(space, layout, color, typography, border, {
  fontSize: 12,
  color: "#6B7280",
  marginTop: 2,
});

const Footer = styled.div(space, layout, color, typography, border, flexbox, {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 16,
});

type UpdateSongProps = {
  song: Song;
  onClose?: () => void;
};

export const UpdateSong: React.FC<UpdateSongProps> = ({ song, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(song.title);
  const [artist, setArtist] = useState(song.artist);
  const [album, setAlbum] = useState(song.album);
  const [genre, setGenre] = useState(song.genre);

  // Update local state when song prop changes
  useEffect(() => {
    setTitle(song.title);
    setArtist(song.artist);
    setAlbum(song.album);
    setGenre(song.genre);
  }, [song]);

  const isValid = title.trim().length > 0;

  const handleUpdate = () => {
    if (!isValid) return;

    const updates: Partial<Omit<Song, "id" | "createdAt" | "updatedAt">> = {};

    // Only include fields that have changed
    if (title !== song.title) updates.title = title;
    if (artist !== song.artist) updates.artist = artist;
    if (album !== song.album) updates.album = album;
    if (genre !== song.genre) updates.genre = genre;

    // Only dispatch if there are actual changes
    if (Object.keys(updates).length > 0) {
      const payload: UpdateSongPayload = {
        id: song.id,
        updates,
      };
      dispatch(updateSongRequest(payload));
    }

    dispatch(closeEditSongModal());
    onClose && onClose();
  };

  const handleCancel = () => {
    // Reset to original values
    setTitle(song.title);
    setArtist(song.artist);
    setAlbum(song.album);
    setGenre(song.genre);
    dispatch(closeEditSongModal());
    onClose && onClose();
  };

  return (
    <Modal>
      <Header>
        <div>
          <Title>
            <span
              style={{
                width: 28,
                height: 28,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#FEF3C7",
                color: "#F59E0B",
                borderRadius: 8,
              }}
            >
              ✏️
            </span>
            Update Song
          </Title>
          <Sub>Modify the song details</Sub>
        </div>
        <span
          style={{ color: "#9CA3AF", cursor: "pointer" }}
          onClick={handleCancel}
        >
          ×
        </span>
      </Header>

      <InputField
        label="Song Title"
        icon={<span style={{ fontSize: 12, color: "#6366F1" }}>♪</span>}
        placeholder="Enter song title"
        value={title}
        onChange={setTitle}
        my={2}
      />

      <InputField
        label="Artist"
        icon={<img src={artistIcon} width={12} height={12} />}
        placeholder="Enter artist name"
        value={artist}
        onChange={setArtist}
        my={2}
      />

      <InputField
        label="Album"
        icon={<img src={cdIcon} width={12} height={12} />}
        placeholder="Enter album name"
        value={album}
        onChange={setAlbum}
        my={2}
      />

      <InputField
        label="Genre"
        icon={<img src={tagIcon} width={12} height={12} />}
        placeholder="Search or select genre"
        value={genre}
        onChange={setGenre}
        my={2}
      />

      <Footer>
        <SecondaryButton onClick={handleCancel}>Cancel</SecondaryButton>
        <IconTextButton
          text="Update Song"
          px={3}
          py={2}
          color={"textOnPrimary"}
          bg={"primary"}
          iconPosition="left"
          icon={<span style={{ color: "#F9FAFB" }}>✏️</span>}
          disabled={!isValid}
          onClick={handleUpdate}
        />
      </Footer>
    </Modal>
  );
};

export default UpdateSong;
