import * as MongoDb from 'mongodb';
import { db } from '../shared/db_connection';

export async function userRegistartion(newItemData) {
    try {
      const userExist = (await db.collection('Users').find({$or:[{username: newItemData.username}, {email: newItemData.email}]}).toArray()).length > 0;
      console.log(userExist);
      if (userExist === false ){
        const documents = await db.collection('Users').insertOne(newItemData);
        console.log(documents);
        return documents;
      }else{
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
}
