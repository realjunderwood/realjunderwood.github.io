<?php
session_start();
if ($_SESSION["admin"] != 1) {
echo "Unauthorized.";
exit();
}
?>


<?php

session_start();
if ($_SESSION["authenticated"] !== true) {
        header("Location:index.php");
        exit();
}


$mysqli = new mysqli("localhost", "root", "", "cecilfiles");


if ($_GET["confirm"] === "true") {

$querydd = $mysqli->query("SELECT * FROM files WHERE publicid='" . $_GET["id"] . "'");
$result = $querydd->fetch_assoc();
unlink("/cecil/" . $result["privateid"]);



	$mysqli->query("DELETE FROM files WHERE publicid = '" . $_GET["id"] . "'");
	echo "<div style='background:green'><h3 style='font-family:verdana;'>sad to see you delete the file.</h3><h1>!!!!</h1></div>";
	echo "<br>";
	echo "<a href='/cecilarchive/browse.php'>browse</a><br><a href='dashboard.php'>dashboard</a>";
	exit();
}

$querydd = $mysqli->query("SELECT * FROM files WHERE publicid='" . $_GET["id"] . "'");
$result = $querydd->fetch_assoc();
?>
<body style="background:brown;font-family:verdana;">
<h1 style="font-size:20px;margin-bottom:0;">Delete File Portal</h1>
<a href="view.php?id=<?= $_GET["id"] ?>" style="color:pink">File page</a><br>
<a href="browse" style="color:red">Browse</a>
<div style="background:green;padding-left:100px;">
<iframe src="file.php?id=<?= $result["publicid"] ?>" width="60%" height="400px"></iframe>
</div>

<p>That's not actually the file's transcription see the file page.</p>
<div style="background:lightblue;margin:0;padding:10px"><p><?= strlen($result["transcription"]) > 0 ? "<b>Transcription:</b><div style='background:pink'>" .  nl2br($result["transcription"]) : "</div><h3>This file has no transcription. <a href='transcribe.php?id=" . $result["publicid"] . "'>add one</a></h3>" ?></p></div></div>
<h1 style="background:red;width:800px;">Are you sure you want to delete this file?</h1>
<p style="background:white">Note: only James may delete files.</p>
<h2 style="background:yellow;color:black;"><a style="color:black" onclick="return confirm('This is your last chance to go back!!!!!!')" href="delete.php?id=<?= $_GET["id"] ?>&confirm=true">Yes, I want to delete the file.</a></h2>
</body>