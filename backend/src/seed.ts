import mongoose from "mongoose";
import SongModel from "./models/song.js";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI ?? "mongodb://localhost:27017/addis_software";
async function main(): Promise<void> {
  await mongoose.connect(MONGODB_URI);

  const sample = [
    {
      title: "Shape of You",
      artist: "Ed Sheeran",
      album: "Divide",
      genre: "Pop",
    },
    {
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      genre: "Synth-pop",
    },
    {
      title: "Smells Like Teen Spirit",
      artist: "Nirvana",
      album: "Nevermind",
      genre: "Rock",
    },
    {
      title: "Billie Jean",
      artist: "Michael Jackson",
      album: "Thriller",
      genre: "Pop",
    },
    {
      title: "HUMBLE.",
      artist: "Kendrick Lamar",
      album: "DAMN.",
      genre: "Hip-Hop",
    },
    {
      title: "Bad Guy",
      artist: "Billie Eilish",
      album: "When We All Fall Asleep, Where Do We Go?",
      genre: "Pop",
    },
    {
      title: "Rolling in the Deep",
      artist: "Adele",
      album: "21",
      genre: "Pop",
    },
    {
      title: "Uptown Funk",
      artist: "Mark Ronson ft. Bruno Mars",
      album: "Uptown Special",
      genre: "Funk",
    },
    {
      title: "Someone Like You",
      artist: "Adele",
      album: "21",
      genre: "Pop",
    },
    {
      title: "Lose Yourself",
      artist: "Eminem",
      album: "8 Mile",
      genre: "Hip-Hop",
    },
    {
      title: "Hey Jude",
      artist: "The Beatles",
      album: "Hey Jude",
      genre: "Rock",
    },
    {
      title: "Hotel California",
      artist: "Eagles",
      album: "Hotel California",
      genre: "Rock",
    },
    {
      title: "Bohemian Rhapsody",
      artist: "Queen",
      album: "A Night at the Opera",
      genre: "Rock",
    },
    {
      title: "Yesterday",
      artist: "The Beatles",
      album: "Help!",
      genre: "Pop",
    },
    {
      title: "Thinking Out Loud",
      artist: "Ed Sheeran",
      album: "x",
      genre: "Pop",
    },
    {
      title: "Can't Stop the Feeling!",
      artist: "Justin Timberlake",
      album: "Trolls (Original Motion Picture Soundtrack)",
      genre: "Pop",
    },
    {
      title: "Happy",
      artist: "Pharrell Williams",
      album: "G I R L",
      genre: "Pop",
    },
    {
      title: "Radioactive",
      artist: "Imagine Dragons",
      album: "Night Visions",
      genre: "Alternative Rock",
    },
    {
      title: "Counting Stars",
      artist: "OneRepublic",
      album: "Native",
      genre: "Pop Rock",
    },
    {
      title: "Shake It Off",
      artist: "Taylor Swift",
      album: "1989",
      genre: "Pop",
    },
    {
      title: "All of Me",
      artist: "John Legend",
      album: "Love in the Future",
      genre: "R&B",
    },
    {
      title: "Chandelier",
      artist: "Sia",
      album: "1000 Forms of Fear",
      genre: "Pop",
    },
    {
      title: "Royals",
      artist: "Lorde",
      album: "Pure Heroine",
      genre: "Electropop",
    },
    {
      title: "Stay With Me",
      artist: "Sam Smith",
      album: "In the Lonely Hour",
      genre: "Soul",
    },
    {
      title: "Firework",
      artist: "Katy Perry",
      album: "Teenage Dream",
      genre: "Pop",
    },
    {
      title: "Viva La Vida",
      artist: "Coldplay",
      album: "Viva la Vida or Death and All His Friends",
      genre: "Alternative Rock",
    },
    {
      title: "Clocks",
      artist: "Coldplay",
      album: "A Rush of Blood to the Head",
      genre: "Alternative Rock",
    },
    {
      title: "Seven Nation Army",
      artist: "The White Stripes",
      album: "Elephant",
      genre: "Garage Rock",
    },
    {
      title: "Numb",
      artist: "Linkin Park",
      album: "Meteora",
      genre: "Nu Metal",
    },
    {
      title: "In the End",
      artist: "Linkin Park",
      album: "Hybrid Theory",
      genre: "Nu Metal",
    },
    {
      title: "Boulevard of Broken Dreams",
      artist: "Green Day",
      album: "American Idiot",
      genre: "Alternative Rock",
    },
    {
      title: "American Idiot",
      artist: "Green Day",
      album: "American Idiot",
      genre: "Punk Rock",
    },
    {
      title: "Take Me to Church",
      artist: "Hozier",
      album: "Hozier",
      genre: "Soul",
    },
    {
      title: "I Will Always Love You",
      artist: "Whitney Houston",
      album: "The Bodyguard",
      genre: "Pop",
    },
    {
      title: "My Heart Will Go On",
      artist: "Celine Dion",
      album: "Let's Talk About Love",
      genre: "Pop",
    },
    {
      title: "Every Breath You Take",
      artist: "The Police",
      album: "Synchronicity",
      genre: "Rock",
    },
    {
      title: "Wonderwall",
      artist: "Oasis",
      album: "(What's the Story) Morning Glory?",
      genre: "Britpop",
    },
    {
      title: "Toxic",
      artist: "Britney Spears",
      album: "In the Zone",
      genre: "Pop",
    },
    {
      title: "Poker Face",
      artist: "Lady Gaga",
      album: "The Fame",
      genre: "Pop",
    },
    {
      title: "Bad Romance",
      artist: "Lady Gaga",
      album: "The Fame Monster",
      genre: "Pop",
    },
    {
      title: "Stronger",
      artist: "Kanye West",
      album: "Graduation",
      genre: "Hip-Hop",
    },
    {
      title: "Gold Digger",
      artist: "Kanye West",
      album: "Late Registration",
      genre: "Hip-Hop",
    },
  ];
  

  await SongModel.deleteMany({});
  const inserted = await SongModel.insertMany(sample);
  console.log(`Seeded ${inserted.length} songs`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
