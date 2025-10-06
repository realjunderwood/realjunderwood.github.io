<?php
session_start();
if ($_SESSION["admin"] != 1) {
echo "Unauthorized.";
exit();
}

$mysqli = new mysqli("localhost", "root", "", "cecilfiles");



if ($_POST["action"] === "snedemail") {
        $subject = $_POST["subject"];
        $body = $_POST["emailcontents"];
        $emailers2 = $mysqli->query("SELECT email FROM users");
        while ($row = $emailers2->fetch_assoc()) {
                $row["email"];
                shell_exec("echo " . escapeshellarg(nl2br($body)) . escapeshellarg(file_get_contents("/home/pi/cecilmail/footer.php")) . " | mail -a 'Content-Type: text/html' -r newsletter@jamesunderwood.net -s " . escapeshellarg($subject) . " '" . $row["email"] . "'");
        }
        //exec(". /home/pi/mailinglist/send.sh '{$body}' '{$subject}'");
        //header("Location:dashboard.php");
	header("Location:admin.php");
}



?>


<?php


if ($_GET["action"] == "kill") {
}

if ($_GET["action"] == "approveuser") {
$mysqli->query("UPDATE users SET activated='1' WHERE id='" . $_GET["id"] . "'");

$email = $mysqli->query("SELECT email FROM users WHERE id ='" . $_GET["id"] . "'")->fetch_object()->email;

exec("echo " . escapeshellarg("This is an automated email to let you know that your request to join the Lester LeFevre Cecil Letter Archive has been approved. You can now log in at www.jamesunderwood.net/cecilarchive.") . " | mail -a 'Content-Type: text/html' -r cecilproject@jamesunderwood.net -s " . escapeshellarg("Cecil Archive Account Approved") . " '" . $email . "'");
}

if ($_GET["action"] == "denyuser") {
$mysqli->query("DELETE FROM users WHERE id='" . $_GET["id"] . "'");

$email = $mysqli->query("SELECT email FROM users WHERE id ='" . $_GET["id"] . "'")->fetch_object()->email;

exec("echo " . escapeshellarg("This is an automated email to let you know that your request to join the Lester LeFevre Cecil Letter Archive has been denied. Only descendents of Harry and Edna Cecil may open an account. If you believe that this is a mistake, email cecilproject@jamesunderwood.net.") . " | mail -a 'Content-Type: text/html' -r cecilproject@jamesunderwood.net -s " . escapeshellarg("Cecil Archive Account Denied") . " '" . $email . "'");

}


if (isset($_GET["action"])) {
header("Location:admin.php");
}
?>

<html>
<head>
<style>
body {
font-family:arial;
}

 table, th, td {
  border: 1px solid black;
margin:10px;
}
th {
letter-spacing:0.01px;
}
</style>
</head>

<body>
<small style="font-size:12px;font-family:arial;letter-spacing:1.5pxx;"><a href="dashboard.php"><i><< home</i></a></small>
<h1 style="margin-top:0">Admin</h1>


<div style="border:1px solid black;">
<h4>ELECTRONIC USERBASE COMMUNICATION SYSTEM<h4>
<h6>In the last input enter "snedemail" to confirm.</h6>
<form method="POST" id="eubcs">
<input name="subject" placeholder="subject">
<br>
<textarea name="emailcontents" placeholder="emailcontents" form="eubcs"></textarea>
<br>
<input placeholder="confirm" name="action">
<br>
<input type="submit" value="SUBMIT QUERY">
</form>
</div>





<table>
<tr>
<th colspan="7">Activitated Users</th>
</tr>
<tr>
<th>Username</th>
<th>First name</th>
<th>Last name</th>
<th>Email</th>
<th>Admin</th>
<th>ID</th>
<th>
</th>
</tr>
<?php

$querydd = $mysqli->query("SELECT username, firstname, lastname, email, admin, id FROM users WHERE activated='1'");
while($result = $querydd->fetch_assoc()) {
?>
<tr class="contentRow" data-acad='<?= $result["admin"]?>' data-acid='<?= $result["id"]?>'>
        <td><?= $result["username"] ?></td>
        <td><?= $result["firstname"] ?></td>
        <td><?= $result["lastname"] ?></td>
	<td><?= $result["email"] ?></td>
	<td><?= $result["admin"] ?></td>
	<td><?= $result["id"] ?></td>
	<td><input type="checkbox" class="acch"></td>
</tr>
<?php
}
?>
<tr>
<td colspan="7" style="text-align:right">


<select id="acselect" disabled>
<option value="actions" selected disabled>Choose action</option>
<option value="movetopending">Move to pending</option>
<option value="togglepriv">Toggle privileges</option>
<option value="denyuser">Delete</option>
</select>
<input type="submit" value="Submit" id="acsubmit" disabled>


</td>
</tr>
</table>

</form>


<table>
<th colspan="6">Pending Users</th>
<tr>
</tr>
<tr>
<th>Username</th>
<th>First name</th>
<th>Last name</th>
<th>Email</th>
<th>Admin</th>
<th>ID</th>
</tr>
<?php
$mysqli = new mysqli("localhost", "root", "", "cecilfiles");

$querydd = $mysqli->query("SELECT username, firstname, lastname, email, admin, id FROM users WHERE activated='0'");
while($result = $querydd->fetch_assoc()) {
?>
<tr class="contentRow">
        <td><?= $result["username"] ?></td>
        <td><?= $result["firstname"] ?></td>
        <td><?= $result["lastname"] ?></td>
        <td><?= $result["email"] ?></td>
        <td><?= $result["admin"] ?></td>
	<td><?= $result["id"] ?></td>
	<td><a href="?action=approveuser&id=<?= $result['id'] ?>" onclick="return confirm('This will allow the user to log in. They will receive an email. Proceed?')"><img src="graphics/approve.png" width="20px"></a></td>
	<td><a href="?action=denyuser&id=<?= $result['id'] ?>" onclick="return confirm('This will delete the record and email the user. Proceed?')"><img src="graphics/delete.png" width="20px"></a></td>

</tr>
<?php
}
?>


</table>

<!--<a href="?action=kill">Kill all sessions</a>-->


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<script>

$(".acch").click(function(){

if ( $(".acch:checked").length == 0 ) {
	$("#acselect").prop("disabled", true);
	$("#acsubmit").prop("disabled", true);
} else {
	$("#acselect").prop("disabled", false);
	$("#acsubmit").prop("disabled", false);
}

});



/*
var currows = [];

$(".acch").click(function(){
currows.push( $(this).closest("tr") );

check();
});

var tempcra = [];
function check() {

tempcra.length =0;
currows.forEach(function(element) {
tempcra.push(element.data.admin);


});

if (tempcra.every( (val, i, arr) => val === arr[0] )) {
	if (tempcra[0] == "0") {
		$("#au").attr("disabled","disabled");
		$("#ua").removeAttr('disabled');
	} else {
		$("#ua").attr("disabled","disabled");
		$("#au").removeAttr('disabled');
	}
} else {
$("#ua").attr("disabled","disabled");
$("#au").attr("disabled","disabled");
}

}

*/



/*
$("#acsubmit").click(function(){

	$(".acch:checked").each(function(i,obj){

		$.ajax({
			type:"GET",
			data: {
//				"id": obj.closest("tr").dataset.id,
				"id": 2,
				"action": $("#acselect").val()
			}
		});

	});

});
*/
</script>

</body>
</html>
