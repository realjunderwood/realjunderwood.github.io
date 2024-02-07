// Song tiles with surrounding marquee wrapper divs :))

const Reactsong = ({ myTracksPool }) => {


function Song({ title, artist, albumCoverUrl, keyy }) {
  return (
    <div className="songrec" key={keyy}>
      <img className="songrecimg" src={albumCoverUrl} alt="Album Cover" />
      <h5 className="songrectitle">{title}</h5>

    </div>
  );
}

  return (
    <div id="marqueecontainer">
    <div id="marquee">
      {myTracksPool.map(song => (
        <Song
          title={song.name}
          albumCoverUrl={song.album.images[0].url}
          keyy={song.id}
        />
      ))}
    </div>
    </div>
  );



}