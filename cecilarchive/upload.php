<?php
//clearstatcache();
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

if ($_POST["action"] === "upload") {


$mysqli = new mysqli("localhost", "root", "", "cecilfiles");
if ($mysqli->connect_errno) {
        echo "error!";
        exit();
}


//There must be a file
if(!(isset($_FILES["fileToUpload"]))){
        echo "Error";
	echo "<h3>err u need a file to upload !!! </h3> ";
        exit;
} else {
	echo "good there is a file";
}
$target_dir = "/cecil/";
$name = htmlspecialchars($mysqli->real_escape_string(strtolower(basename($_FILES["fileToUpload"]["name"]))));
echo $name;
$file_ext = strtolower(substr(strrchr($name, '.'),1));
echo $file_ext;
//The file will be random string (based on name) + file_ext
$location = md5(random_bytes(128)) . "." . $file_ext;
$target_file = $target_dir . $location;
$error_count = 0;

//Check size again


if($_FILES["fileToUpload"]["size"] == 0) {
        echo "File has no size<br>";
        //$error_count++;
}
//Check name length
if(strlen($name) > 100)
{
        echo "File's name is too long<br>";
        $error_count++;
}
//Check extension - it needs to be alphanumeric
if(!(ctype_alnum($file_ext)))
{
        echo "Invalid file extension<br>";
        $error_count++;
}
if($error_count == 0)
{
//Upload the file
if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        $db_query = $mysqli->query("SELECT * FROM files WHERE name = '" . $name . "'");
        $num = substr(md5(random_bytes(128)),-8);

        $db_query = $mysqli->query("INSERT INTO files (privateid, publicid, date, notes, author, recipient) VALUES ('" . $location . "', '" . $num . "', '" . date("Y-m-d",strtotime($_POST["date"])) . "', '" . htmlspecialchars($mysqli->real_escape_string($_POST["notes"])) . "', '" . htmlspecialchars($mysqli->real_escape_string($_POST["author"])) . "', '" . htmlspecialchars($mysqli->real_escape_string($_POST["hamtower"])) . "')");

	header("Location:transcribe.php?id=" . $num);


}else{
        echo "Failure";
	exit();
}
}
//PublicID is a guarenteed random string > 8 alphanumeric characters
//Location is random MD5 hash
//header("Location:dashboard.php");


exit();
}

?>
<html>
	<head>
			<link rel="stylesheet" href="/cecilarchive/css/style.css?">
<meta name="viewport" content="width=device-width, initial-scale=1">

<style>
textarea{
 vertical-align: top;
width:100%;
}
</style>

	</head>
	<body>
		<h2>Upload</h2>
		<h4>ONLY JAMES IS ALLOWED TO UPLOAD FILES</h4>
		<small><a href="dashboard.php">dashboard</a> | <a href="browse.php">browse</a></small><br>
		<form id="uploadform" method="post" enctype="multipart/form-data">
		<input type="hidden" name="action" value="upload">
		<table>
		<tr>
			<td><label for="thefile">Upload File</label></td>
			<td><input type="file" name="fileToUpload" id="thefile"></td>
		</tr>
<!--		<tr>
			<td><label for="transcript">Plaintext Transcript</label></td>
			<td><textarea form="uploadform" id="transcript" name="transcript"></textarea></td>
		</tr>-->
		<tr>
			<td><label for="date">Date</label></td>
			<td><input type="date" name="date" id="date"></td>
		</tr>
		<tr>
               	        <td><label for="author">Author</label></td>
                        <td><input id="author" name="author" type="text"></td>
                </tr>
		<tr>
			<td><label for="hamtower">Recipient</label></td>
			<td><input id="hamtower" name="hamtower" type="text"></td>
		</tr>


		<tr>
			<td><label for="notes">Notes</label></td>
			<td><textarea form="uploadform" id="notes" name="notes"></textarea></td>
		</tr>
		<tr>
			<td colspan="2"><input type="submit" value="continue"></td>
		</tr>
		</table>
		</form>

	</body>
</html>