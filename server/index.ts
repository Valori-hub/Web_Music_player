import express, { Request, RequestHandler, Response } from 'express';
import * as SongsRoutes from './routes/songs';
import * as PlaylistRoutes from './routes/playlists';
import * as UserRoutes from './routes/signup'

import cors from 'cors';

var BodyParser = require ('body-parser');
const app = express();
const port = 3000;
app.use(BodyParser.json())
app.use(cors({ origin: "http://localhost:4200" }));
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/songs', SongsRoutes.router as RequestHandler);
app.use('/playlists', PlaylistRoutes.router as RequestHandler);
app.use('/users', UserRoutes.router as RequestHandler);


      
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});