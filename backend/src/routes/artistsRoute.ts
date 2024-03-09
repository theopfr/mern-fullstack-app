// Author: Theodor Peifer

import express from "express";
import { getArtistsController, getArtistByIdController, addArtistsController, deleteArtistsByIdController, updateArtistsController } from "../controllers/artistsController";
import { authenticationCheck } from "../middleware/authenticationCheck";

const artistsRouter = express.Router()

artistsRouter.get("/artists", authenticationCheck, getArtistsController);
artistsRouter.get("/artists/:id", authenticationCheck, getArtistByIdController);
artistsRouter.post("/artists", authenticationCheck, addArtistsController);
artistsRouter.delete("/artists", authenticationCheck, deleteArtistsByIdController);
artistsRouter.put("/artists", authenticationCheck, updateArtistsController);


export default artistsRouter;