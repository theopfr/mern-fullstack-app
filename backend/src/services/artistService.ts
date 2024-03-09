// Author: Theodor Peifer

import dotenv from "dotenv";
import { IArtist, ArtistModel } from "../models/artistModel";
import { Types } from "mongoose";


dotenv.config();

  
export async function loadArtists(sortOption: string | undefined = undefined, artistId: string | undefined = undefined) {  
    let artistData: IArtist[];
  
    try {
        if (artistId) {
            const result: IArtist[] | null = await ArtistModel.findById(new Types.ObjectId(artistId));
            if (!result) {
                throw new Error("artistIdNotFound");
            }
            artistData = result;
        }
        else {
            artistData = await ArtistModel.find();
        }
    }
    catch (error) {
        throw new Error(`Error loading artists: ${error}`);
    }
  
    if (sortOption && Array.isArray(artistData)) {
        if (sortOption !== "asc" && sortOption !== "desc") {
            throw new Error("unknownSortParameter");
        }
  
        artistData.sort((nextArtist, currentArtist) => {
            const compareResult = nextArtist.surname.localeCompare(currentArtist.surname);
            return sortOption === "asc" ? compareResult : -compareResult;
        });
    }

    return artistData;
}


export async function addArtists(newArtistsData: IArtist[]) {
    try {
        for (const artistData of newArtistsData) {
            const artist = new ArtistModel(artistData);
            await artist.save();
        }
    }
    catch (error: any) {
        throw new Error("newArtistFailed");
    }
    
}


export async function deleteArtistsById(artistIds: string[]) {
    try {
        const result = await ArtistModel.deleteMany({ _id: { $in: artistIds } });
    }
    catch {
        throw new Error("deleteArtistFailed");
    }
}

export async function updateArtists(artistsDataToUpdate: Record<string, Partial<IArtist>>) {  
    try {
        for (const artistId in artistsDataToUpdate) {
            const artistData = artistsDataToUpdate[artistId];

            // Convert date into correct format
            if (artistData.birthday) {
                artistData.birthday = new Date(artistData.birthday).toString();
            }

            await ArtistModel.updateOne({ _id: new Types.ObjectId(artistId) }, { $set: artistData });
        }
    }
    catch (error) {
        throw new Error("artistUpdateFailed");
    }
}
