// Author: Theodor Peifer

import mongoose, { Schema, model } from "mongoose";


interface IArtist {
    firstName: string;
    surname: string;
    birthday: string;
    nationality: string;
    website: string;
    instagram: string;
    biography: string;
    stars: number;
}

const artistModel = new Schema<IArtist>({
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    birthday: { type: String, required: true },
    nationality: { type: String, required: true },
    website: { type: String, required: false },
    instagram: { type: String, required: false },
    biography: { type: String, required: false },
    stars: { type: Number, required: true }
});

const ArtistModel = model<IArtist>("Artists", artistModel, "artists");

export { IArtist, ArtistModel };

