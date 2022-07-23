import clientPromise from "$lib/db";
import { ObjectId } from "mongodb";

export async function GET() {
	try {
		const dbConnection = await clientPromise;
		const db = dbConnection.db();
		const collection = db.collection("notes");
		const notes = await collection.find().toArray();
		return {
			status: 200,
			body: {
				notes
			}
		};
	} catch (err) {
		return {
			status: 500,
			body: {
				error: err.toString()
			}
		};
	}
}

export async function POST(event) {
	try {
		const dbConnection = await clientPromise;
		const db = dbConnection.db();
		const collection = db.collection("notes");
		const note = await event.request.json();
		await collection.insertOne(note);
		return {
			status: 200,
			body: note
		};
	} catch (err) {
		return {
			status: 500,
			body: {
				message: err.toString(),
				error: err
			}
		};
	}
}

export async function PUT(event) {
	try {
		const dbConnection = await clientPromise;
		const db = dbConnection.db();
		const collection = db.collection("notes");
		const note = await event.request.json();
		const { _id, ...data } = note;
		await collection.updateOne({ _id: ObjectId(_id) }, { $set: data });
		const notes = await collection.find().toArray();
		return {
			status: 200,
			body: { notes }
		};
	} catch (err) {
		return {
			status: 500,
			body: {
				message: err.toString(),
				error: err
			}
		};
	}
}
