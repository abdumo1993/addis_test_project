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
import { IconTextButton, SecondaryButton } from "./buttons";
import { useDispatch } from "react-redux";
import { deleteSongRequest, closeDeleteConfirmModal } from "../state";
import type { Song } from "../state/types/songs.types";

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

const Content = styled.div(space, layout, color, typography, border, {
  marginBottom: 16,
});

const SongInfo = styled.div(space, layout, color, typography, border, {
  backgroundColor: "#F9FAFB",
  borderRadius: 8,
  padding: 12,
  marginBottom: 16,
});

const Footer = styled.div(space, layout, color, typography, border, flexbox, {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 16,
});

type DeleteSongProps = {
  song: Song;
  onClose?: () => void;
};

export const DeleteSong: React.FC<DeleteSongProps> = ({ song, onClose }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteSongRequest(song.id));
    dispatch(closeDeleteConfirmModal());
    onClose && onClose();
  };

  const handleCancel = () => {
    dispatch(closeDeleteConfirmModal());
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
                background: "#FEF2F2",
                color: "#DC2626",
                borderRadius: 8,
              }}
            >
              🗑️
            </span>
            Delete Song
          </Title>
          <Sub>This action cannot be undone</Sub>
        </div>
        <span
          style={{ color: "#9CA3AF", cursor: "pointer" }}
          onClick={handleCancel}
        >
          ×
        </span>
      </Header>

      <Content>
        <p style={{ margin: "0 0 12px 0", fontSize: 14, color: "#374151" }}>
          Are you sure you want to delete this song? This action cannot be
          undone.
        </p>

        <SongInfo>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#111827",
              marginBottom: 4,
            }}
          >
            {song.title}
          </div>
          <div style={{ fontSize: 12, color: "#6B7280" }}>
            {song.artist} • {song.album}
          </div>
          <div style={{ fontSize: 12, color: "#6B7280" }}>{song.genre}</div>
        </SongInfo>
      </Content>

      <Footer>
        <SecondaryButton onClick={handleCancel}>Cancel</SecondaryButton>
        <IconTextButton
          text="Delete Song"
          px={3}
          py={2}
          color={"textOnPrimary"}
          bg={"error"}
          iconPosition="left"
          icon={<span style={{ color: "#F9FAFB" }}>🗑️</span>}
          onClick={handleDelete}
        />
      </Footer>
    </Modal>
  );
};

export default DeleteSong;
