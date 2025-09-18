type countType = {
    count: number;
};
type labledCountType = {
    count: number;
    _id: string;
};
type songAlbumCountType = {
    _id: string;
    totalSongs: number;
    totalAlbums: number;
};
type songPerAlbumType = {
    _id: string;
    count: number;
    artist: string;
};
export type StatDataType = {
    totalArtists: countType[];
    totalAlbums: countType[];
    totalGenres: countType[];
    totalSongs: countType[];
    songsPerGenre: labledCountType[];
    songsPerAlbum: songPerAlbumType[];
    songsAndAlbumsPerArtist: songAlbumCountType[];
};
export {};
//# sourceMappingURL=util.d.ts.map