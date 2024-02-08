FaceMusic 🙂🎵

---

We like to listen to music that matches our mood. But it's hard to remember all the songs you like, and how they sound. Plus, figuring out whether you are happy or sad requires a lot of emotional intelligence.

FaceMusic solves this problem. First, it takes a picture of your face to determine your mood. Then, pulling from songs you like, it makes a playlist that matches your detected mood.

Emotion detection is accomplished with [Face-API](https://justadudewhohacks.github.io/face-api.js/docs/index.html), which is a client-side JavaScript API. Face-API identifies the largest face in the photograph and returns confidence scores between 0 and 1 for 7 different emotions, which are used to create a composite happiness score between 0 and 1.

To get favorite songs, FaceMusic calls the [Spotify API](https://developer.spotify.com/documentation/web-api) to get a user's top 100 tracks over the past 4 weeks, the past 6 months, and all time, with duplicates removed (so the pool has between 100 and 300 tracks). The API is called again to get happiness scores (called "valence" scores by Spotify), which are between 0 and 1, for each song.

FaceMusic then sorts the list of songs by the absolute value of the difference between the song's happiness score and the user's happiness scor (ie, maximize similarity between the two scores), and plucks the top 15 songs to return to the user. The user can then click a button to generate a playlist on their profile, using the Spotify API.

FaceMusic is built with ReactJS.