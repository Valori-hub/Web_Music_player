import * as MongoDb from 'mongodb';
import { db } from '../shared/db_connection';

export async function validateUserLogin() {
    try {
      const documents = await db.collection('User').find().toArray();
      console.log(documents);
      return documents;
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
}
