import * as MongoDb from 'mongodb';
import { db } from '../shared/db_connection';

export async function searchSong(searchInput: string) {
  function quotemeta(searchInput: string) {
    return (searchInput + '').replace(
      /[.*+?^${}()|[\]\\/.\\+*?[\]^$(){}\/]/g,
      '\\$&'
    );
  }
  const filterRegex = new RegExp(`^${quotemeta(searchInput)}`, 'i');
  try {
    if (filterRegex) {
      const artistResults = await db
        .collection('Songs')
        .find({ artist: filterRegex })
        .limit(10)
        .toArray();
      const songsResults = await db
        .collection('Songs')
        .find({ title: filterRegex })
        .limit(10)
        .toArray();
      return { artistResults: artistResults, songsResults: songsResults };
    } else {
      console.log('type something');
    }
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
}
