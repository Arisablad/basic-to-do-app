import {MongoClient} from "mongodb";
import * as mongoose from "mongoose";
const dbConnection = async () => {
        const MONGO_URI = process.env.MONGO_URI;
    try {
        if (!MONGO_URI) {
            throw new Error("Please define the MONGO_URI environment variable inside .env.local");
        }
        const client = await mongoose.connect(MONGO_URI);
    } catch (error) {
        process.exit(1);
    }
}


export default dbConnection