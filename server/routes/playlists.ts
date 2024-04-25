import * as playlists from '../services/playlists'
import express from 'express';

const router = express.Router();
router.get('', async (req, res) => {
  const result = await playlists.getPlayLists();
  res.send(result);
});
export { router };