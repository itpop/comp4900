<?php
//if (session_status() == PHP_SESSION_NONE) {
    session_start();
//}
 
$dbhost = "localhost";        // hostname
$dbname = "playbookdatabase"; // database name
$dbuser = "root";             // username
$dbpass = "password";         // password
 
$con = mysqli_connect($dbhost, $dbuser, $dbpass) or die("MySQL Error: " . mysqli_error());
mysqli_select_db($con, $dbname) or die("MySQL Error: " . mysqli_error());
?>