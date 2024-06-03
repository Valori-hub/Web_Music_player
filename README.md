# 🎵 Web music player 🎵
<br>
This project was primarily aimed at learning and exploring Angular using Material UI, TypeScript, Express and MongdoDB.

# Features
* User registration and login
* Integration with user's playlists
* Playlist creator
* Playback controls (play, pause, next, previous, volume)

# Instalation

To run the project locally, follow these steps:

1. Clone the repository:
```
git clone https://github.com/Valori-hub/Web_music_player.git
```
2. Navigate to the project directory:
```
cd ./Web-music-player
```
3. Create a new Mongo database named MusicPlayer and then create collections with the same names as those in the mongoDB folder. Next, import the appropriate JSON files into the collections

MusicPlayer <br/>
&emsp;&emsp;├───GenreInfo <br/>
&emsp;&emsp;├───PlayLists <br/>
&emsp;&emsp;├───Songs <br/>
&emsp;&emsp;└───Users <br/>
5. Install node modules in the server directory:
```
cd ./server
npm i
```
5. Install node modules in the client directory:
```
cd ./Web_Music_Player
npm i
```
6. Run server:
```
Web_Music_player\server>  nodemon index.ts
```
7. Run aplication:
```
Web_Music_player/Web_Music_Player>  ng serve
```
# ✅ To do :x: 

## 🔲 - remodel user current session storaging  //work in progress
## 🔲 - add responsivity to application.
## 🔲 - write comments
## 🔲 - implement editing functionality for playlists and user profile.
