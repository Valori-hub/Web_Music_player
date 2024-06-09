import * as MongoDb from 'mongodb';
import { db } from '../shared/db_connection';
import { IcreatorPlaylist, Iplaylist, Isong } from '../model/playlist';
import { ObjectId } from 'mongodb';

export async function getPlayLists() {
  try {
    const documents = await db.collection('PlayLists').find({}).toArray();
    return documents;
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
}
export async function getPlayList(playlist_id: string) {
  try {
    const documents = await db
      .collection('PlayLists')
      .find({ _id: new MongoDb.ObjectId(playlist_id) })
      .toArray();
    return documents[0];
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
}
export async function getUserPlayList(playlist_id: string, userAuth: string) {
  try {
    const userMatch = await db
      .collection('Users')
      .findOne({ username: userAuth }, { projection: { playlists: 1 } });
    if (!userMatch) {
      console.log(`User with username ${userAuth} not found.`);
      return null;
    }

    if (!userMatch.playlists) {
      console.log(`User with username ${userAuth} has no playlists.`);
      return null;
    }

    console.log(
      `Playlists found for user ${userAuth}:`,
      userMatch.playlists.length
    );

    const playlist = userMatch.playlists.find(
      (p) => p._id.toString() === playlist_id
    );

    if (!playlist) {
      console.log(`Playlist with ID ${playlist_id} not found.`);
      return null;
    }
    return playlist;
  } catch (error) {
    console.error('Error retrieving playlist:', error);
    throw error;
  }
}
export async function createPlaylist(
  playlistData: IcreatorPlaylist,
  user: string
) {
  try {
    const userExist = await db.collection('Users').findOne({ username: user });
    if (!userExist) {
      return;
    }

    if (!userExist.playlists) {
      userExist.playlists = [];
    }
    playlistData._id = new ObjectId();
    userExist.playlists.push(playlistData);

    await db
      .collection('Users')
      .updateOne(
        { username: user },
        { $set: { playlists: userExist.playlists } }
      );

    return { success: true, message: 'Playlist added' };
  } catch (error) {
    console.error('Error adding playlist: ', error);
  }
}
export async function getUserPlaylists(user: string) {
  try {
    const userExist = await db.collection('Users').findOne({ username: user });
    if (!userExist) {
      return;
    } else {
      const playlistUserData = userExist.playlists;
      console.log(playlistUserData);
      return {
        success: true,
        message: 'Playlist added',
        data: playlistUserData,
      };
    }
  } catch (error) {
    console.error('Error adding playlist: ', error);
  }
}
export async function addToPlaylist(
  user: string,
  song: Isong,
  playlist: Iplaylist
) {
  try {
    const userExist = await db.collection('Users').findOne({ username: user });
    if (!userExist) {
      return { success: false, message: 'User not found' };
    } else {
      const playlistExist = userExist.playlists.find(
        (p) => p._id.toString() === playlist._id.toString()
      );
      console.log('Playlist match');
      if (playlistExist) {
        const songAlreadyExist = playlistExist.songs.find(
          (p) => p._id.toString() === song._id.toString()
        );
        if (songAlreadyExist) {
          console.log('song exist in this playlist');
        } else {
          playlistExist.songs.push(song);
        }
      } else {
        return { success: false, message: 'Playlist not found' };
      }
      await db
        .collection('Users')
        .updateOne(
          { username: user },
          { $set: { playlists: userExist.playlists } }
        );
      return {
        success: true,
        message: 'Song added',
      };
    }
  } catch (error) {
    console.error('Error adding playlist: ', error);
  }
}
