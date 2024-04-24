import express from 'express';
import * as SongsRoutes from './routes/songs';
import * as GenreInfoRoutes from './routes/genreInfo';
import cors from 'cors';


const app = express();
const port = 3000;
app.use(cors({ origin: "http://localhost:4200" }));
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Use SongsRoutes as middleware for the /songs route
app.use('/songs', SongsRoutes.router);
app.use('/genreInfo', GenreInfoRoutes.router);
app.use('/genreInfo', GenreInfoRoutes.router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});