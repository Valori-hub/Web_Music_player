
import * as MongoDb from 'mongodb';

const mongoURI: string = 'mongodb://localhost:27017'; // Change this to your MongoDB URI
const dbName: string = 'MusicPlayer'; // Change this to your database namez

let db: MongoDb.Db;

async function connectToMongoDB(): Promise<void> {
  try {
    const client = new MongoDb.MongoClient(mongoURI, {})
    const connection = await client.connect();
    console.log('Connected to MongoDB');
    db = connection.db(dbName);
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

connectToMongoDB();

export { db };