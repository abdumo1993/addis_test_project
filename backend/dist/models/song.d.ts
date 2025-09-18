import mongoose, { type InferSchemaType } from "mongoose";
declare const songSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title: string;
    artist: string;
    album: string;
    genre: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title: string;
    artist: string;
    album: string;
    genre: string;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title: string;
    artist: string;
    album: string;
    genre: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export type SongDoc = InferSchemaType<typeof songSchema>;
declare const SongModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title: string;
    artist: string;
    album: string;
    genre: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title: string;
    artist: string;
    album: string;
    genre: string;
}, {}, {}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title: string;
    artist: string;
    album: string;
    genre: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export default SongModel;
//# sourceMappingURL=song.d.ts.map