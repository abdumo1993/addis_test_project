import styled from "@emotion/styled";
import {
  layout,
  space,
  color,
  typography,
  border,
  flexbox,
} from "styled-system";
import { TextContent } from "./cards";
import musicNoteIcon from "../assets/music-note.svg";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";

//
const Box = styled.div(space, color, layout, typography, border, {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});
// New primitives (follow emotion + styled-system style)
const Row = styled.div(space, color, layout, typography, border, flexbox, {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "12px",
});

const Column = styled.div(space, color, layout, typography, border, flexbox, {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  gap: "8px",
});
type tilePropType = {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  content: React.ReactNode;
} & React.ComponentProps<typeof Box>;

export const AreaT = styled("div")(space, layout, color, typography, flexbox, {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  flex: 1,
});

export const Area = styled("div")(space, layout, color, typography, border, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const ImageArea = styled.img(space, layout, color, typography, border, {
  display: "block",
  cursor: "pointer",
});

// Helpers
const Pill = styled.div(space, color, layout, typography, border, {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 999,
  paddingInline: 8,
  height: 24,
});

// Progress components were used previously; remove for the simplified StatTile

export const Tile = ({
  content,
  leading,
  trailing,
  ...props
}: tilePropType) => {
  return (
    <Row border={"none"} borderRadius={1} bg={"green"} {...props}>
      {leading && leading}
      <AreaT>{content}</AreaT>
      {trailing && trailing}
    </Row>
  );
};

type SongTileType = {
  title: string;
  artist: string;
  genre: string;
  album: string;
} & React.ComponentProps<typeof Row>;

export const SongTile = ({
  title,
  artist,
  genre,
  album,
  ...props
}: SongTileType) => {
  const leading = (
    <Area borderRadius={2} p={3} bg={"green"} mr={1}>
      <ImageArea
        borderRadius={2}
        src={musicNoteIcon}
        alt="music note"
        width={"24"}
        height={"24"}
      />
    </Area>
  );

  const content = (
    <Column>
      <TextContent fontSize={2}>{title}</TextContent>
      <TextContent fontSize={0} color={"muted"}>
        {artist} • {album}
      </TextContent>
      <TextContent fontSize={0} color={"muted"}>
        {genre}
      </TextContent>
    </Column>
  );

  const trailing = (
    <Row gap={2}>
      <ImageArea
        src={editIcon}
        alt="edit"
        width={"24"}
        height={"24"}
        onClick={() => {
          console.log("edit");
        }}
      />
      <ImageArea
        src={deleteIcon}
        alt="delete"
        width={"24"}
        height={"24"}
        onClick={() => {
          console.log("delete");
        }}
      />
    </Row>
  );

  return (
    <Tile
      bg={"white"}
      color={"black"}
      p={3}
      content={content}
      leading={leading}
      trailing={trailing}
      {...props}
    />
  );
};

// StatTile
type StatTileProps = {
  label: string;
  subtitle?: string;
  value: number | string;
  unit?: string;
  progressPercent?: number; // 0-100
  icon?: React.ReactNode;
} & React.ComponentProps<typeof Row>;

export const StatTile = ({
  label,
  subtitle,
  value,
  unit = "",
  icon,
  ...props
}: StatTileProps) => {
  const leading = icon ? <Area p={2}>{icon}</Area> : undefined;
  const content = (
    <Column>
      <TextContent fontSize={2} fontWeight={"bold"}>
        {label}
      </TextContent>
      {subtitle && (
        <TextContent fontSize={0} color={"muted"}>
          {subtitle}
        </TextContent>
      )}
    </Column>
  );
  const trailing = (
    <Column alignItems={"flex-end"}>
      <TextContent fontSize={3} fontWeight={"bold"}>
        {value}
      </TextContent>
      {unit && (
        <TextContent fontSize={0} color={"muted"}>
          {unit}
        </TextContent>
      )}
    </Column>
  );
  return (
    <Tile
      bg={"white"}
      color={"black"}
      content={content}
      leading={leading}
      trailing={trailing}
      p={3}
      {...props}
    />
  );
};

// BadgeTile
type BadgeTileProps = {
  label: string;
  count: number | string;
  colorKey?: string; // theme color key for pill background
} & React.ComponentProps<typeof Row>;

export const BadgeTile = ({
  label,
  count,
  colorKey = "purple",
  ...props
}: BadgeTileProps) => {
  const content = (
    <Row justifyContent={"space-between"} width={"100%"}>
      <TextContent flexShrink={0} fontSize={0}>
        {label}
      </TextContent>
      <Pill bg={colorKey} color={"textOnPrimary"} ml="auto">
        {count}
      </Pill>
    </Row>
  );
  return (
    <Tile
      bg={"white"}
      color={"black"}
      content={content}
      width={"100%"}
      p={1}
      {...props}
    />
  );
};

// NavTile
type NavTileProps = {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
} & React.ComponentProps<typeof Row>;

export const NavTile = ({
  icon,
  label,
  active = false,
  onClick,
  ...props
}: NavTileProps) => {
  const content = (
    <Row alignItems={"center"} gap={2} width={"100%"}>
      {icon && <Area p={1}>{icon}</Area>}
      <TextContent>{label}</TextContent>
    </Row>
  );
  return (
    <Tile
      onClick={onClick}
      bg={active ? "primary" : "transparent"}
      color={active ? "textOnPrimary" : "inherit"}
      content={content}
      p={1}
      {...props}
      sx={{ cursor: "pointer" } as any}
    />
  );
};

// Optional namespaced API
// @ts-ignore - augmenting function with fields for convenient usage
(Tile as any).Song = SongTile;
// @ts-ignore
(Tile as any).Stat = StatTile;
// @ts-ignore
(Tile as any).Badge = BadgeTile;
// @ts-ignore
(Tile as any).Nav = NavTile;
