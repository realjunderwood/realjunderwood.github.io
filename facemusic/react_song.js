const Reactsong = ({ myTracksPool }) => {

    console.log("hiii it's reactsong with trackspool" + tracksPool)


function Song({ title, artist, albumCoverUrl, keyy }) {
  return (
    <div className="songrec" key={keyy}>
      <img class="songrecimg" src={albumCoverUrl} alt="Album Cover" />
      <h5 class="songrectitle">{title}</h5>

    </div>
  );
}

  return (
    <div>
      {tracksPool.map(song => (
        <Song
          title={song.name}
          albumCoverUrl={song.album.images[0].url}
          keyy={song.id}
        />
      ))}
    </div>
  );



}