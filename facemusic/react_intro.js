const Reactintro = () => {
    return (

        <div id="intro">

    <div className="introTextDiv" style={{marginTop:30+'vh'}}>
        <h1>We like to listen to music that matches our mood.</h1>
    </div>
    <div className="introTextDiv" style={{marginTop:3+'vh'}}>
        <h4>Scroll to continue ↓</h4>
    </div>
    {/* <!--<div class="introTextDiv" style="margin-top:100vh;">
        <h1>But there's a problem:</h1>
    </div>--> */}
    <div className="introTextDiv" style={{marginTop:50+'vh'}}>
        <h1>But it's hard to remember all the songs you like, and how they sound.</h1>
    </div>

    <div className="introTextDiv" style={{marginTop:5+'vh'}}>
        <h1>Plus, self-identifying whether you are happy or sad requires a lot of emotional intelligence.</h1>

    </div>

    <div className="introTextDiv" style={{marginTop:50+'vh'}}>
        <h1>FaceMusic solves this problem.</h1>
    </div>

    <div className="introTextDiv" style={{marginTop:5+'vh'}}>
        <h1>First, we take a picture of your face.</h1>
    </div>

    <div className="introTextDiv" style={{marginTop:5+'vh',marginBottom:30+'vh'}}>
        {/* margin-bottom:30vh; */}
        <h1>Then, based on songs and artists you like, we'll make a playlist that matches your detected mood.</h1>
    </div>


</div>




    );
  };
  