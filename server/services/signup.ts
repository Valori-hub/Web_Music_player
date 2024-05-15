import * as MongoDb from 'mongodb';
import { db } from '../shared/db_connection';

export async function userRegistartion(newItemData) {
    try {
      const userExist = (await db.collection('Users').find({$or:[{username: newItemData.username}, {email: newItemData.email}]}).toArray()).length > 0;
      if (userExist === false ){
        const documents = await db.collection('Users').insertOne(newItemData);
        console.log('Account has been created');
        return { success: true, message: 'Account created successfully', data: documents };;
      }else{
        return { success: false, message: 'User already exists' };
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
}
export async function userLogin(newItemData: {username: string, password: string}) {
  try {
    const userExist = (await db.collection('Users').findOne({username: newItemData.username, password: newItemData.password}));
    console.log(userExist);
    if(userExist != null){
      return { success: true, message: 'Logged in ', userExist};
    }else{
      return { success: false, message: "Couldn't find account" };
    }

  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
}
