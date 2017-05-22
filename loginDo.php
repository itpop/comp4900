<?php   
    // User authenticaton.    
    include "base.php";
    $fail = false;
    
    //check we have username and passwd post variables
    if(isset($_POST["username"]) && isset($_POST["passwd"]))
    {            
        //trim and lowercase username
        $username = mysqli_real_escape_string($con, $_POST['username']);
        $passwd = mysqli_real_escape_string($con, $_POST['passwd']);
            
        $result = mysqli_query($con, "call spUserFind('".$username."', '".$passwd."')"); 
                    
        if(mysqli_num_rows($result) == 1) {                 
            $row = mysqli_fetch_array($result);
            $userId = $row['ID_MEMBER'];
            $groupId = $row['ID_GROUP'];
            
            if($userId > 1) {
                $_SESSION['UserName'] = $username;
                $_SESSION['GroupId'] = $groupId;
                echo "<meta http-equiv='refresh' content='0; url=index.php' />";                       
            } else {
                $fail = true;
            }
        } else {
            $fail = true;
        }
        if ($fail) {
            echo "<meta http-equiv='refresh' content='0; url=login.php?id=1' />";  
        }
    }
?>