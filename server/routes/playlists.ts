import { IcreatorPlaylist, Iplaylist, Isong } from '../model/playlist';
import * as playlists from '../services/playlists';
import express from 'express';

const router = express.Router();
router.get('/playlists', async (req, res) => {
  const result = await playlists.getPlayLists();
  res.send(result);
});
router.get('/playlist', async (req, res) => {
  const playlist_id = req.query.playlistId as string;
  const result = await playlists.getPlayList(playlist_id);
  res.send(result);
});
router.get('/playlist-user', async (req, res) => {
  const playlist_id = req.query.playlistId as string;
  const userAuth = req.query.username as string;
  const result = await playlists.getUserPlayList(playlist_id, userAuth);
  res.send(result);
});
router.post('/create-playlist', async (req, res) => {
  const playlistData = req.body.playlist as IcreatorPlaylist;
  const userAuth = req.body.userId as string;
  const result = await playlists.createPlaylist(playlistData, userAuth);
  res.status(201).json({ data: result });
});
router.post('/user-playlists', async (req, res) => {
  const userAuth = req.body.username as string;
  const result = await playlists.getUserPlaylists(userAuth);
  res.status(201).json({ data: result });
});
router.post('/add', async (req, res) => {
  const userAuth = req.body.username as string;
  console.log(userAuth + 'add button');
  const song = req.body.song as Isong;
  const playlist = req.body.playlist as Iplaylist;
  const result = playlists.addToPlaylist(userAuth, song, playlist);
  res.status(201).json({ data: result });
});
export { router };
