import { MongoClient } from "mongodb";

const uri = import.meta.env.MONGODB_URI;
const options = {
	useUnifiedTopology: true,
	useNewUrlParser: true
};

let client;
let clientPromise;

try {
	if (!uri) {
		throw new Error("Please add your Mongo URI to .env.local");
	}

	if (import.meta.env.MODE === "development") {
		// In development mode, use a global variable
		// so that the value is preserved across module reloads
		// caused by HMR (Hot Module Replacement).
		if (!global._mongoClientPromise) {
			client = new MongoClient(uri, options);
			global._mongoClientPromise = client.connect();
		}
		clientPromise = global._mongoClientPromise;
	} else {
		// In production mode, it's best to
		// not use a global variable.
		client = new MongoClient(uri, options);
		clientPromise = client.connect();
	}
} catch (err) {
	console.error(err);
}
// Export a module-scoped MongoClient promise.
// By doing this in a separate module,
// the client can be shared across functions.
export default clientPromise;
