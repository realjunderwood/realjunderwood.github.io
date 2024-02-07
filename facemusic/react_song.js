const Reactsong = ({ tracksPool }) => {

function Song({ title, artist, albumCoverUrl }) {
  return (
    <div className="song" key={keyy}>
      <img class="songrecimg" src={albumCoverUrl} alt="Album Cover" />
      <h5 class="songrectitle">{title}</h5>

    </div>
  );
}

  return (
    <div className="songrec">
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