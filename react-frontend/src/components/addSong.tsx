import styled from "@emotion/styled";
import {
  space,
  layout,
  color,
  typography,
  border,
  flexbox,
} from "styled-system";
import React, { useState } from "react";
import InputField from "./inputfield";
import { IconTextButton, SecondaryButton } from "./buttons";
import tagIcon from "../assets/tag.svg";
import artistIcon from "../assets/artist.svg";
import cdIcon from "../assets/cd.svg";

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

type AddSongProps = { onClose?: () => void };

export const AddSong: React.FC<AddSongProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("");

  const isValid = title.trim().length > 0;

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
                background: "#EEF2FF",
                color: "#6366F1",
                borderRadius: 8,
              }}
            >
              +
            </span>
            Add New Song
          </Title>
          <Sub>Fill in the song details</Sub>
        </div>
        <span
          style={{ color: "#9CA3AF", cursor: "pointer" }}
          onClick={() => onClose && onClose()}
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
        <SecondaryButton
          onClick={() => {
            setTitle("");
            setArtist("");
            setAlbum("");
            setGenre("");
            onClose && onClose();
          }}
        >
          Cancel
        </SecondaryButton>
        <IconTextButton
          text="Add Song"
          px={3}
          py={2}
          color={"textOnPrimary"}
          bg={"primary"}
          iconPosition="left"
          icon={<span style={{ color: "#F9FAFB" }}>+</span>}
          disabled={!isValid}
          onClick={() => {
            if (!isValid) return;
            alert(`Added: ${title} by ${artist}`);
          }}
        />
      </Footer>
    </Modal>
  );
};

export default AddSong;
