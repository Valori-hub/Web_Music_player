import * as GenreServices from '../services/genreInfo'
import express from 'express';

const router = express.Router();
router.get('/genre_info-list', async (req, res) => {
  const result = await GenreServices.getGenreInfo();
  res.send(result);
});
export { router }; // Export the router instance