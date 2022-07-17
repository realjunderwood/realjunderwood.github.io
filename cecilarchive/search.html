
<?php
session_start();
if ($_SESSION["authenticated"] !== true) {
        header("Location:index.php");
        exit();
}
?>
<div style="background: #82e0aa ;width:600px">
<h1 style="margin-bottom:0">Search</h1>
<small><a href="dashboard.php"><< back</a></small>

<h3>This is a prototype for the search function. It is still makeshift and will be updated at a later time.</h3>
<p>Get in touch with any suggestions. cecilproject@jamesunderwood.net <br> -- James
</p>

<form method="POST">
<input type="text" name="keyword" placeholder="keyword">
<input type="hidden" name="hello" value="isma">
<input value="submit query" type="submit">
</form>
<code>
<?php


function highlight_word( $content, $word ) {
    $replace = '<span style="background-color: yellow;">' . strtoupper($word) . '</span>'; // create replacement
    $content = str_ireplace( $word, $replace, $content ); // replace content

    return $content; // return highlighted data
}

if ($_POST["hello"] == "isma") {

        $mysqli = new mysqli("localhost", "root", "", "cecilfiles");

        $result = $mysqli->query("SELECT * FROM transcriptions WHERE content LIKE '%" . $_POST['keyword'] . "%' AND current='1';");
echo"<div style='padding:10px;background: 	#87CEFA;'>";
echo "RESULTS<br><br>";
        echo $result->num_rows . " MATCHES FOR QUERY <i>" . $_POST['keyword'] . "</i>";
        echo "<ul>";


        while ($row = $result->fetch_assoc()) {


		echo "<strong><a href='view.php?id=" . $row["fileid"] . "'>" . $row["date"] . " FROM " . $row["author"] . " TO " . $row["recipient"] . "</a></strong>";
                echo "<li>" . highlight_word($row['content'], $_POST["keyword"]) . "</li>";
                echo "<br>";
        }

	echo "</ul>";
	echo "END RESULTS";
echo "</div>";
}
?>

</code>
</div>
