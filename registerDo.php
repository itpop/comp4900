<?php
    // Stores user's information when the form is submitted.
    
    include "base.php";
    include "global.php";
    
    $userName = mysqli_real_escape_string($con, $_POST['username']);
    $passwd = mysqli_real_escape_string($con, $_POST['passwd']);
    $email = mysqli_real_escape_string($con, $_POST['email']);
    $groupId = 1;
    $passwd1 = null;  

    if(!empty($userName) && !empty($passwd)) {
        $userUpdate = mysqli_query($con, "call spUserUpdate(0,'".$userName."', '".$passwd."', '".$passwd1."', 
            '".$email."', '".$groupId."')"); 
        if($userUpdate->num_rows > 0) {
            $row = mysqli_fetch_array($userUpdate);
            $userId = $row['memberId'];
            if($userId > 1) {
                echo "<meta http-equiv='refresh' content='0; url=login.php' />";
            } 
        } 
    }
    
?>