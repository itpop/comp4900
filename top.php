<?php include "base.php"; ?>
<html lang="en">
<head>
    <title>Football Playbook Online</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- STYLES -->
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" href="css/bootstrap-colorpicker.min.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/base.css">
    <!-- JQUERY & BOOTSTRAP SCRIPTS -->
    <!--script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script-->
    <!--script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"></script-->
    <script src="js/jquery.min.js"></script>
    <script src="js/tether.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <!--script src = "js/bootstrap-colorpicker.min.js"></script-->
    <script src='https://www.google.com/recaptcha/api.js'></script>
    <!-- KNOCKOUT -->
    <!-- script src="http://knockoutjs.com/downloads/knockout-3.4.2.js"></script-->
    <script src="js/knockout-3.4.2.js"></script>
    <!-- FABRIC -->
    <script src = "js/fabric.js"></script>
    <!-- GLOBAL SCRIPT -->
    <script type="text/javascript" src="js/global.js"></script>
    <script type="text/javascript">
        /* 
         * Toggle between adding and removing the "responsive" class to 
         * topnav when the user clicks on the icon.
         */
        function toggleNav() {
            var x = document.getElementById("myTopnav");
            if (x.className === "topnav") {
                x.className += " responsive";
            } else {
                x.className = "topnav";
            }
        }
    </script>
</head>
<body>
   <div class="topnav" id="myTopnav">
    <a href="index.php">Home</a>
    <a href="design.php">Design</a>
    <a href="playbook.php">Playbooks</a>
    <a href="support.php">Support</a>
    <?php if(!empty($_SESSION['UserName'])) { ?>
      <a href="account.php">Account</a>
      <?php } else {?>
      <a href="login.php">Login</a>
      <?php } ?>
    <a href="javascript:void(0);" class="icon" onclick="toggleNav()">&#9776;</a>
  </div>
</body>
</html>  