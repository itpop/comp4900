<?php   
    // Checks the availability for username.
    
    include "base.php";
    
    //check we have username post variable
    if(isset($_POST["username"]))
    {
        //check if its an ajax request, exit if not
        if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
            die();
        } 
            
        //trim and lowercase username
        $username = mysqli_real_escape_string($con, $_POST['username']);
            
        //check username in db
        $checkname = mysqli_query($con, "call spUserFindName('".$username."')");    
        
        //if value is more than 0, username is not available
        if($checkname->num_rows > 0) {
            //echo '<img src="images/marks1.png" alt="unavailable" />';
            echo "<span class='error'>This username already exists.</span>";
        } else {
            //echo '<img src="images/marks.png" alt="available"/>';
            echo "<span class='msgok'>This username is unique.</span>";
        }
    }
?>