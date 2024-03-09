// Author: Theodor Peifer

import mongoose from "mongoose";


async function connectMongoDB(dbUri: string | undefined): Promise<void> {
	if (!dbUri) {
		throw new Error("No URI provided!");
	}

	try {
		await mongoose.connect(dbUri);
		console.log("Connected to MongoDB");
	}
	catch (error) {
		console.log(error)
	}
}

export default connectMongoDB;