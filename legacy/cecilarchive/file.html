<?php

session_start();
if ($_SESSION["authenticated"] !== true) {
        //header("Location:index.php?redirect=file.php?id=" . $_GET["id"]); Whoops this isn't the view.php page :-) 12/21/18
	header("Location:index.php");
        exit();
}


$fileid = strtolower($_GET['id']);

//If it contains anything other than numbers/letters then exit
//If less than 9 characters then exit
//If the stuff after first 8 characters isn't numbers then exit
//If it's blank then exit


if(!(ctype_alnum($fileid)) || strlen($fileid) < 9 || !(ctype_digit(substr($fileid,8))) || $fileid == "")
{
	//echo "Invalid file id.";
	//exit;
}

$mysqli = new mysqli("localhost", "root", "", "cecilfiles");
if ($mysqli->connect_errno) {
        echo "error!";
        exit();
}

$db_query = $mysqli->query("SELECT * FROM files WHERE publicid = '" . $fileid . "'");
$result = $db_query->fetch_assoc();
if($mysqli->affected_rows === 0)
{
        echo "The file \"<i>" . $fileid . "</i>\" does not exist";
	exit;
}
if($mysqli->affected_rows > 1)
{
	//If more than one file is associated with this id, something is wrong
	echo "An unknown error has occured";
	exit;
}
$fileLoc = $result["privateid"];
//If the first 32 characters of file location aren't alphanumeric, then something is messed up
if(!(ctype_alnum(substr($fileLoc,0,32))))
{
	echo "An unknown error has occured";
	exit;
}
$fileDir = '/cecil/';
$file = $fileDir . $fileLoc;
if (file_exists($file))
{
	//Get extension
	$file_ext = strtolower(substr(strrchr($fileLoc, '.'),1));
	if((substr($fileLoc,0,32) . "." . $file_ext) != $fileLoc)
	{
		//If first 32 characters plus the extension isn't the location, then there are multiple extensions... big problem
		echo "An unknown error has occured";
		exit;
	}
	//Get contents
	$known_mime_types=array(
		"js"  => "text/plain",
        	"htm" => "text/plain",
        	"zip" => "application/zip",
        	"doc" => "application/msword",
                "jpg" => "image/jpeg",
                "php" => "text/plain",
                "xls" => "application/vnd.ms-excel",
                "ppt" => "application/vnd.ms-powerpoint",
                "gif" => "image/gif",
                "pdf" => "application/pdf",
                "txt" => "text/plain",
                "html"=> "text/plain",
                "png" => "image/png",
                "jpeg"=> "image/jpeg",
        );
        //$contents = file_get_contents($file);
/*	if(array_key_exists($file_ext, $known_mime_types) )
	{*/
		//Display file in browser
		ob_clean();
		$mime_type=$known_mime_types[$file_ext];
		header( 'Accept-Ranges: bytes');
		header('Content-disposition: inline; filename=file.' . $file_ext . '');
		header('Content-Transfer-Encoding:binary');
		header('Content-Length: ' . filesize($file));
		header('Content-Type: ' . $mime_type);
		echo file_get_contents($file);
} else {
	//This means the file was deleted
//	echo "The file \"<i>" . $result['name'] . "</i>\" no longer exists";
}
?>

