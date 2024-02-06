const Reactsong = ({ tracksPool }) => {

function Song({ title, artist, albumCoverUrl }) {
  return (
    <div className="song">
      <img src={albumCoverUrl} alt="Album Cover" />
      <h5>{title}</h5>
    </div>
  );
}

  return (
    <div className="song-list">
      {tracksPool.map(song => (
        <Song
          title={song.name}
          albumCoverUrl={song.album.images[0].url}
        />
      ))}
    </div>
  );



}