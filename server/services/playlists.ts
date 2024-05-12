import * as MongoDb from 'mongodb';
import { db } from '../shared/db_connection';

export async function getPlayLists() {
    try {
      const documents = await db.collection('PlayLists').find({}).toArray();
      console.log(documents);
      return documents;
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
}
export async function getPlayList(playlist_id: string) {
  try {
    const documents = await db.collection('PlayLists').find({_id: new MongoDb.ObjectId(playlist_id)}).toArray();
    console.log(documents);
    return documents[0];
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
}
