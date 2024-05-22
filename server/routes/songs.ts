import * as SongsServices from '../services/songs';
import express, { Request as ExpressRequest, Response } from 'express';

const router = express.Router();

router.post('/search', async (req: ExpressRequest, res: Response) => {
  try {
    const search = req.body.searchInput;
    const result = await SongsServices.searchSong(search);
    if (result != null) {
      res.status(201).json({ searchResults: result });
    } else {
      res.status(401).json({ error: 'Can not find song or artist' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
export { router };
