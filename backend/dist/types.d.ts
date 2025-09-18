export type Song = {
    title: string;
    artist: string;
    album: string;
    genre: string;
};
export type numDicts = {
    [key: string]: number;
};
export type detailDicts = {
    [key: string]: numDicts;
};
export type Stats = {
    totalSongs: number;
    totalArtists: number;
    totalAlbums: number;
    totalGenres: number;
    songsPerGenre: numDicts;
    songsAndAlbumsPerArtist: detailDicts;
};
/**
 * total # of songs, artists, albums, genres
 * # of songs in every genre
 * # of songs and albums each artist has
 * # songs in each album
 * most popular genre (by song count)
 * most prolific artist (by song or album count)
 * albums released per year
 * artists with songs in multiple genres
\
 */
//# sourceMappingURL=types.d.ts.map