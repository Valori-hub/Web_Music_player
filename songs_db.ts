const songs = [
  {
    id: 0,
    title: "Let's Party All Night",
    artist: 'lucafrancini',
    duration: '1:52',
    cover: 'https://cdn.pixabay.com/audio/2024/04/03/14-43-51-383_200x200.jpg',
    genre: 'electro',
    link:
  },
  {
    id: 1,
    title: 'Neon Fury',
    artist: 'Neura-Flow',
    duration: '3:07',
    cover: 'https://cdn.pixabay.com/audio/2024/04/09/04-55-04-459_200x200.jpg',
    genre: 'electro',
    link:
  },
  {
    id: 2,
    title: 'The Fighter',
    artist: 'FASSounds',
    duration: '1:57',
    cover: 'https://cdn.pixabay.com/audio/2023/07/03/11-59-41-65_200x200.jpg',
    genre: 'electro',
    link:
  },
  {
    id: 3,
    title: 'Perfect (Phonk)',
    artist: 'Dedpled',
    duration: '2:18',
    cover: 'https://cdn.pixabay.com/audio/2023/03/15/17-47-45-178_200x200.png',
    genre: 'electro',
    link:
  },
  {
    id: 4,
    title: 'Sahara',
    artist: 'SoulProdMusic',
    duration: '1:27',
    cover: 'https://cdn.pixabay.com/audio/2023/03/20/01-02-00-414_200x200.jpg',
    genre: 'electro',
    link:
  },
  {
    id: 5,
    title: 'Let the Games Begin',
    artist: 'Psychronic',
    duration: '2:42',
    cover: 'https://cdn.pixabay.com/audio/2022/08/02/16-34-06-204_200x200.png',
    genre: 'electro',
    link:
  },
  {
    id: 6,
    title: 'Battlefield Elegy',
    artist: 'Neura-Flow',
    duration: '2:00',
    cover: 'https://cdn.pixabay.com/audio/2024/04/11/06-11-40-53_200x200.jpg',
    genre: 'piano',
    link:
  },
  {
    id: 7,
    title: 'lovely brunch',
    artist: 'Harumachi',
    duration: '2:12',
    cover: 'https://cdn.pixabay.com/audio/2024/04/06/11-29-40-744_200x200.jpg',
    genre: 'piano',
    link:
  },
  {
    id: 8,
    title: 'My Love Medium',
    artist: 'Grand_Project',
    duration: '1:40',
    cover: 'https://cdn.pixabay.com/audio/2023/11/21/20-23-20-964_200x200.jpg',
    genre: 'piano',
    link:
  },
  {
    id: 9,
    title: 'Sense Of Time',
    artist: 'Onoychenkomusic',
    duration: '2:50',
    cover: 'https://cdn.pixabay.com/audio/2024/03/26/14-22-19-278_200x200.jpeg',
    genre: 'piano',
    link:
  },
  {
    id: 10,
    title: 'Evening Twilight',
    artist: 'Harumachi',
    duration: '2:44',
    cover: 'https://cdn.pixabay.com/audio/2024/04/04/07-50-23-658_200x200.jpg',
    genre: 'piano',
    link:
  },
  {
    id: 11,
    title: 'Spring',
    artist: 'Oleksii_Kalyna',
    duration: '2:48',
    cover: 'https://cdn.pixabay.com/audio/2024/02/26/09-07-59-480_200x200.jpg',
    genre: 'piano',
    link:
  },
  {
    id: 12,
    title: 'Rock Drive',
    artist: 'Alex_Kizenkov',
    duration: '2:14',
    cover: 'https://cdn.pixabay.com/audio/2023/03/20/13-53-24-89_200x200.png',
    genre: 'rock',
    link:
  },
  {
    id: 13,
    title: 'Forever Young',
    artist: 'AudioCoffee',
    duration: '3:14',
    cover: 'https://cdn.pixabay.com/audio/2024/02/02/07-53-02-958_200x200.jpg',
    genre: 'rock',
    link:
  },
  {
    id: 14,
    title: 'Call The Police',
    artist: 'Gvidon',
    duration: '2:09',
    cover: 'https://cdn.pixabay.com/audio/2023/06/02/04-26-39-785_200x200.png',
    genre: 'rock',
    link:
  },
  {
    id: 15,
    title: 'Adventure Hunter',
    artist: 'moodmode',
    duration: '1:23',
    cover: 'https://cdn.pixabay.com/audio/2024/03/29/17-16-54-648_200x200.png',
    genre: 'rock',
    link:
  },
  {
    id: 16,
    title: 'Kings Of The Surf',
    artist: 'EugeneMyers',
    duration: '1:55',
    cover: 'https://cdn.pixabay.com/audio/2023/12/01/04-15-10-941_200x200.jpg',
    genre: 'rock',
    link:
  },
  {
    id: 17,
    title: 'Spirit of Excitement',
    artist: 'Sunsides',
    duration: '1:45',
    cover: 'https://cdn.pixabay.com/audio/2024/03/27/18-36-26-763_200x200.png',
    genre: 'rock',
    link:
  },
  {
    id: 18,
    title: 'a private detective',
    artist: 'Harumachi',
    duration: '1:15',
    cover: 'https://cdn.pixabay.com/audio/2024/03/26/08-26-05-154_200x200.jpg',
    genre: 'jazz',
    link:
  },
  {
    id: 19,
    title: 'Its good to you 140',
    artist: 'Darockart',
    duration: '2:08',
    cover: 'https://cdn.pixabay.com/audio/2023/10/19/00-03-29-211_200x200.jpg',
    genre: 'jazz',
    link:
  },
  {
    id: 20,
    title: 'Love In Paris',
    artist: 'HD-Studio',
    duration: '1:47',
    cover: 'https://cdn.pixabay.com/audio/2023/11/09/18-32-41-196_200x200.png',
    genre: 'jazz',
    link:
  },
  {
    id: 21,
    title: 'All Jazzed Out',
    artist: 'geoffharvey',
    duration: '1:21',
    cover: 'https://cdn.pixabay.com/audio/2023/11/18/11-58-53-328_200x200.jpg',
    genre: 'jazz',
    link:
  },
  {
    id: 22,
    title: 'Funny Friends',
    artist: 'SergePavkinMusic',
    duration: '2:50',
    cover: 'https://cdn.pixabay.com/audio/2023/06/05/13-07-02-143_200x200.jpg',
    genre: 'jazz',
    link:
  },
  {
    id: 23,
    title: 'Copacabana',
    artist: 'HD-Studio',
    duration: '2:37',
    cover: 'https://cdn.pixabay.com/audio/2023/12/08/13-22-26-512_200x200.png',
    genre: 'jazz',
    link:
  },
]