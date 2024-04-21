import * as MongoDb from 'mongodb';
import { db } from '../shared/db_connection';

export async function getAllSongs() {
    try {
      const collection = db.collection('Songs');
      const documents = await collection.aggregate([
        {
          $group: {
            _id: '$genre',
            songs: {
              $push: {
                id: '$id',
                title: '$title',
                artist: '$artist',
                duration: '$duration',
                cover: '$cover',
                genre: '$genre',
                link: '$link',
              },
            },
          },
        },
      ]).toArray();
      return documents;
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
}
