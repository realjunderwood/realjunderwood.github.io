<?php
session_start();
if ($_SESSION["authenticated"] !== true) {
        header("Location:index.php?redirect=view.php?id=" . $_GET["id"]);
        exit();
}

$mysqli = new mysqli("localhost", "root", "", "cecilfiles");

$querydd = $mysqli->query("SELECT * FROM files WHERE publicid='" . $_GET["id"] . "'");
$result = $querydd->fetch_assoc();


$transcription = $mysqli->query("SELECT content FROM transcriptions WHERE fileid='" . $_GET["id"] . "' AND current='1'");
$transcription =  $transcription->fetch_assoc()["content"];



//echo $transcription;
//echo "SELECT content FROM transcriptions WHERE fileid='" . $_GET["id"] . "' ORDER BY id ASC LIMIT 1";
?>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">

<meta property="og:image" content="https://www.jamesunderwood.net/cecilarchive/graphics/logo.png">
                <meta property="og:title" content="The Lester Cecil Lefevre Cecil Letter Archive">

<style>
body {
background:silver;
}
a {
color:green;
}
</style>
</head>
<body>
<h2 style="font-variant:small-caps;margin-bottom:0;">File View</h2>
<small style="font-size:18"><a href="dashboard.php">home</a> | <a href="browse.php">browse</a></small>
<h6 style="margin:0;margin-top:15px;font-variant:small-caps;font-size:11px;"><a href="delete.php?id=<?= $_GET["id"] ?>" onclick="return confirm('Do you really want to permanently DELETE this file? Only James is allowed to.')">Delete</a></h6>
<hr>
<small style="font-size:24"><a href="transcribe.php?id=<?= $_GET["id"] ?>">edit transcription</a> | <a href="edit.php?id=<?= $_GET["id"] ?>">edit details</a></small>
<hr>
<table border="1">
	<tr>
		<th>DATE</th>
		<th>TO</th>
		<th>FROM</th>
		<th>NOTES</th>
	</tr>
	<tr>
		<td><?= $result["date"] ?></td>
		<td><?= $result["recipient"] ?></td>
		<td><?= $result["author"] ?></td>
		<td><?= nl2br($result["notes"]) ?></td>
	</tr>
</table>
<br>
<fieldset style="padding-right:60px;padding-left:60px;">
	<legend>Transcription <a href="downloadtranscription.php?id=<?= $_GET["id"] ?>" style="background:white;font-family:verdana;border:3px inset orange;padding-left:10px;padding-right:10px;font-size:0.6em;color:black;">download as .txt</a></legend>
	<div>


		<pre style="word-wrap:break-word;white-space:pre-wrap;line-height:1.15em;"><?= strlen($transcription) > 0 ? nl2br($transcription) : "</pre><p>This file has no transcription. <a href='transcribe.php?id=" . $_GET["id"] . "'>Add one?</a></p>" ?>


	</div>
</fieldset>
<fieldset style="padding-right:60px;padding-left:60px;">
	<legend>View</legend>
	<iframe src="file.php?id=<?= $_GET["id"] ?>" width="100%" height="580px"></iframe>
</fieldset>
<br>
<center><small style="font-size:13;letter-spacing:2px;"><a href="#">TOP</a></small></center>
</body>
</html>
