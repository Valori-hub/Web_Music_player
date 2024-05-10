import * as MongoDb from 'mongodb';
import { db } from '../shared/db_connection';

export async function userRegistartion(newItemData) {
    try {
      const documents = await db.collection('users').insertOne(newItemData);
      console.log(documents);
      return documents;
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
}
