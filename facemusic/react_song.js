// Song tiles with surrounding marquee wrapper divs :))

const Reactsong = ({ myTracksPool }) => {


function Song({ title, artist, albumCoverUrl, keyy }) {
  return (
    <div className="songrec" key={keyy}>
      <img className="songrecimg" src={albumCoverUrl} alt="Album Cover" />
      <h5 className="songrectitle">{title}</h5>
      <h6 classname="songrecartist">{artist}</h6>

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
          artist={song.artists[0].name}
          keyy={song.id}
        />
      ))}
    </div>
    </div>
  );



}