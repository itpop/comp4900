<?php   
    // User authenticaton.    
    include "base.php";
    include "global.php";

    $contactId = 0;

    //check we have name and email post variables
    if(isset($_POST["firstname"]) && isset($_POST["email"]))
    {            
        //trim and lowercase username
        $firstname = mysqli_real_escape_string($con, $_POST['firstname']);
        $lastname = mysqli_real_escape_string($con, $_POST['lastname']);
        $email = mysqli_real_escape_string($con, $_POST['email']);
        $subject = mysqli_real_escape_string($con, $_POST['subject']);
        $message = mysqli_real_escape_string($con, $_POST['message']);
        $username = $firstname . ' ' . $lastname;
            
        $result = mysqli_query($con, "call spContactUpdate('".$contactId."', '".$username."', '".$email."', 
            '".$subject."', '".$message."')"); 
                    
        if(mysqli_num_rows($result) == 1) {                 
            $row = mysqli_fetch_array($result);
            $contactId = $row['contactId'];
            
            if($contactId > 0) {
                showMessage("Thank you for your message, we will respond to you shortly.");
                echo "<meta http-equiv='refresh' content='2; url=index.php' />";                       
            } 
        }        
    }
?>