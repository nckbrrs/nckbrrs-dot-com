import "server-only";
import { db } from "./db";
import { images } from "./db/schema";
import { eq } from "drizzle-orm";

export async function getImages() {
	const images = await db.query.images.findMany({
		orderBy: (model, { desc }) => desc(model.id)
	});

	return images;
}

export async function getImage(id: number) {
	const image = await db.query.images.findFirst({
		where: eq(images.id, id)
	});

	if (!image) throw new Error("Image not found");

	return image;
}
