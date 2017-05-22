<?php 
    include "top.php"; 
    include "global.php";
    
    $isIOS = checkIOS();
    $url = 'http://www.footballplaybookonline.com/account.php';

    if ($isIOS) {
        header('Location: ' . $url);
    }
?>
<html>
<head>
    <!-- STYLES -->
    <link rel="stylesheet" type="text/css" href="css/account.css" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>
<body>
    <div class="container text-center" id="mainWrapper">
    <?php include "header.php"; ?>
        <div class="accWrapper">
            <div class="row acc-style">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <?php if(empty($_SESSION['GroupId']) || $_SESSION['GroupId'] < 1) { ?>
                        You are not currently logged in, Please <a href="login.php">Log In</a> to
                        view your playbook.
                    <?php } else if($_SESSION['GroupId'] < 2) {?>
                        You must be a premium member to access view your playbook.
                    <?php } ?>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    Benefits of a premium membership include:
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <ul>
                        <li>Increased functionality including:
                            <ul><li>player labels</li>
                            <li>different line types </li>
                            <li> different line endings </li>
                            <li> multiple colors for lines and players </li></ul></li>
                        <li>Easy to use playbook to access and edit all of your plays</li>
                        <li>More play templates </li>
                        <li>No advertisements</li>
                    </ul>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <a href="http://www.footballplaybookonline.com/account.php">Access Premium Features Now!</a>
                </div>
            </div>            
        </div>

    </div>
    <?php include "footer.php"; ?>
</body>
</html>