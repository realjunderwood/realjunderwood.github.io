<?php
session_start();
if ($_SESSION["authenticated"] !== true) {
        header("Location:index.php");
        exit();
}
$mysqli = new mysqli("localhost", "root", "", "cecilfiles");

if ($_POST["action"] === "yes") {
	$subcheck = (isset($_POST["incomplete"])) ? 1 : 0;
	//$mysqli->query("UPDATE files SET transcription = '" . htmlspecialchars($mysqli->real_escape_string($_POST["transcription"])) . "' WHERE publicid = '" . htmlspecialchars($mysqli->real_escape_string($_POST["id"])) . "'");

 $mysqli->query("UPDATE transcriptions SET current='0' WHERE fileid='" . htmlspecialchars($mysqli->real_escape_string($_POST["id"])) . "'");
	$mysqli->query("INSERT INTO transcriptions (date, content, fileid, userid, current) VALUES ('" . date('Y-m-d H:i:s') . "', '" . addslashes($_POST["transcription"]) . "', '" . htmlspecialchars($mysqli->real_escape_string($_POST["id"])) . "', '" . $_SESSION["id"] . "', '1')");


	$mysqli->query("UPDATE files SET incomplete= '" . $subcheck . "' WHERE publicid = '" . htmlspecialchars($mysqli->real_escape_string($_POST["id"])) . "'");

	header("Location:view.php?id=" . $_POST["id"]);

	exit();
}



$transcription = $mysqli->query("SELECT content FROM transcriptions WHERE fileid='" . $_GET["id"] . "' AND current='1'");
$transcription =  $transcription->fetch_assoc()["content"];

?>


<head>
<style>
body {
background:cyan;
font-family:verdana;
padding-left:10px;
padding-right:10px;
}
</style>
</head>
<body>

<div style="background:white;display:inline-block;">
<small style="font-family:Verdana;" id="aisi">You are signed in.</small>
</div>
<details open style="">
<summary style="margin:0"><small>show/hide header</small></summary>
<div style="display:inline-block;background:orange;vertical-align:top;padding:1px;height:150px;overflow-y:scroll;width:100%;border-right:10px solid gray;">
<h4 style="margin:0">Guidelines &mdash; read before transcribing (draft)</h4>
<ul style="margin:5px">
<li>The transcription should accurately reflect the content of the letter; do not correct spelling or punctuation.</li>
<li>Do not transcribe the envelope page.</li>
<li>Only use a new line at the beginning of each paragraph. If a word is cut into two lines with a hyphen, simply write the word together.</li>
<li>It's okay if you cannot read a word. Just write <i>{ILL}</i>.</li>
<li>Save your work often. This function is not infallible and it is awfully inefficient and frustrating to lose your work.</li>
</ul>
<h4 style="margin:0">Thanks for contributing.</h4>

</div>

<div style="display:inline-block;background:red;"><a href="view.php?id=<?= $_GET["id"] ?>">file page</a> | <a href="dashboard.php">home</a></div>
<div style="background:lightgreen;border:1px solid black;width:500px;display:none;" id="noticenotice">
<p style="margin:0">Notice: this transcription is already marked as complete.</p>
</div>




</details>

<div style="">

	 <iframe style="width:800px;height:600px;display:inline-block;border:1px solid black;resize:horizontal;vertical-align:top" src="file.php?id=<?= $_GET["id"] ?>"></iframe>
	<div style="resize:horizontal;flex-grow:1;display:inline-block;border:1px solid black;width:600px;max-width:500px;height:600px;max-height:600px;padding:0;">
			<form method="POST" id="transcribeform">
				<textarea spellcheck="false" style="font-size:18px;scrollbar-width:thick;width:100%;height:525px;margin:0;border:0px;resize: none;" form="transcribeform" name="transcription"><?= $transcription ?></textarea>
				<div style="height:25px;max-height:25px;margin:0;background:white;">
					<input type="checkbox" id="incomplete" name="incomplete"<?= $mysqli->query("SELECT * FROM files WHERE publicid='" . $_GET["id"] . "'")->fetch_assoc()["incomplete"] == "0" ? ""  : " checked='checked'" ?>><label for="incomplete">transcription is incomplete</label>
				</div>
<?php
?>

				<input type="hidden" value="yes" name="action">
				<input type="hidden" value="<?= $_GET["id"] ?>" name="id">
				<input type="submit" value="save" style="height:50px;width:100%;">
			</form>
		</div>

</div>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<script>
var textareas = document.getElementsByTagName('textarea');
var count = textareas.length;
for(var i=0;i<count;i++){
    textareas[i].onkeydown = function(e){
        if(e.keyCode==9 || e.which==9){
            e.preventDefault();
            var s = this.selectionStart;
            this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
            this.selectionEnd = s+1; 
        }
    }
}

if (document.getElementById("incomplete").checked == false) {
document.getElementById("noticenotice").style.display = "inline-block";
}
</script>

<script>

setInterval(function(){
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       var signedin = xhttp.responseText;
	if (signedin == "yes") {
		document.getElementById("aisi").innerHTML = "You are signed in.";
	} else {
		document.getElementById("aisi").innerHTML = "<h2>WARNING: You are <strong>not</strong> signed in and your work will not be saved. Copy your work, sign in again, and paste it back here.</h1>";
	}

    }
};
xhttp.open("GET", "aili.php", true);
xhttp.send();
},10000);

</script>
</body>

