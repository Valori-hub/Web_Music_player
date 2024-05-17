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

export async function searchSong(searchInput:string) {
  function quotemeta(searchInput) {
    return (searchInput + '').replace(/[.*+?^${}()|[\]\\/.\\+*?[\]^$(){}\/]/g, '\\$&');
  }
  const filterRegex = new RegExp(`^${quotemeta(searchInput)}`, 'i');
  try {
    if(filterRegex){
      const artistResults = (await db.collection('Songs').find({artist: filterRegex}).limit(10).toArray());
      const songsResults = (await db.collection('Songs').find({title: filterRegex}).limit(10).toArray());
      console.log(artistResults, songsResults)
      return {artistResults: artistResults, songsResults: songsResults}
    }else{
      console.log('type something');
    }
    
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
}
