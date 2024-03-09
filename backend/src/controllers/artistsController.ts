// Author: Theodor Peifer

import {Request, Response} from "express";
import { IArtist } from "../models/artistModel";
import { loadArtists, addArtists, deleteArtistsById, updateArtists } from "../services/artistService";


export const getArtistsController = async (req: Request, res: Response) => {
    const queryParameters = req.query;

    let sortOption: string | undefined = queryParameters.sort as string | undefined;

    try {
        res.json(await loadArtists(sortOption));
    }
    catch (error: any) {
        res.status(300).json({ message: error.message });
    }
}


export const getArtistByIdController = async (req: Request, res: Response) => {
    let artistId: string = req.params.id;

    try {
        res.json(await loadArtists(undefined, artistId));
    }
    catch (error: any) {
        res.status(300).json({ message: error.message });
    }
}


export const addArtistsController = async (req: Request, res: Response) => {
    try {

        const artistData: IArtist[] = req.body; 

        await addArtists(artistData);
        res.json({ message: "successfullyAddedArtists" });
    }
    catch (error: any) {
        res.status(300).json({ message: error.message });
    }
}


export const deleteArtistsByIdController = async (req: Request, res: Response) => {
    try {
        await deleteArtistsById(req.body);
        res.json({ message: "successfullyDeletedArtists" });
    }
    catch (error: any) {
        res.status(300).json({ message: error.message });
    }
}
 
export const updateArtistsController = async (req: Request, res: Response) => {
    try {
      const artistsDataToUpdate: Record<string, Partial<IArtist>> = req.body;
  
      // Validate the incoming data structure
      if (!artistsDataToUpdate || typeof artistsDataToUpdate !== 'object') {
        throw new Error('Invalid request body');
      }
  
      await updateArtists(artistsDataToUpdate);
      res.json({ message: 'successfullyUpdatedArtists' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };