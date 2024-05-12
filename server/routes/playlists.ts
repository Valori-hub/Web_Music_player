import * as playlists from '../services/playlists'
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
export{router}