import * as SongsServices from '../services/songs'
import express from 'express';

const router = express.Router();
router.get('/list-byGenre', async (req, res) => {
  const result = await SongsServices.getAllSongs();
  res.send(result);
});
export { router };