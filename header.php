<?php 
    include "base.php"; 
    include "global.php";
    $isMobile = checkMobile();
?>

<!doctype html>
<html lang="en">
<head>
    <title>Football Playbook Online</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/base.css">
    <script language="JavaScript" type="text/javascript">
        function confirmLogout() {
            if(window.confirm("Are you sure you want to logout? All unsaved data will be lost."))
                window.open('logout.php', '_parent');
        }
    </script>
</head>
<body>
<?php if ($isMobile) {?>
    <div id="header-mob">     
        <div id="header-navigation">
            <div id='nav-left-mob'></div>
            <div id='nav-contain-mob'>
                <a class='nav-item-mob' href="index.php">Home</a>
                <a class='nav-item-mob' href="design.php">Design</a>
                <a class='nav-item-mob' href="playbook.php">Playbooks</a>
                <a class='nav-item-mob' href="support.php">Support</a>
                <?php if(!empty($_SESSION['UserName'])) { ?>
                <a class='nav-item-mob' href="account.php">Account</a>
                <?php } else {?>
                <a class='nav-item-mob' href="login.php">Login</a>
                <?php } ?>
            </div>
            <div id='nav-right-mob'></div>
        </div>
        <!--div id='facebook-mob'>
                <iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2FFootballPlaybookOnline%2F&amp;width=450&amp;height=80&amp;colorscheme=light&amp;layout=standard&amp;action=like&amp;show_faces=false&amp;send=true" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:450px; height:80px;margin-top:5px;" allowTransparency="true"></iframe>
        </div-->
        <div id='status-mob'><?php
            if(!empty($_SESSION['UserName'])) {                    
                $userName = $_SESSION['UserName'];
                echo "Welcome: $userName. <a href='#' target='_parent' onclick='confirmLogout()'>Logout</a>";
            } else {
                echo "Welcome: Guest";
            }
            ?>
        </div>
    </div><!-- header-->
    <?php } else { ?>
    <div id="header"> 
        <div id='logo'>
            <a href="index.php"><img src='img/fpo_final.png' width='300px' height='140px' 
                alt='Football Playbook Online' /></a>
        </div>
        <div id='header-subnav'>
        </div><!-- subnav-->
        <div id="header-navigation">
            <div id='nav-left'></div>
            <div id='nav-contain'>
                <a class='nav-item' href="index.php">Home</a>
                <a class='nav-item' href="design.php">Design</a>
                <a class='nav-item' href="playbook.php">Playbooks</a>
                <a class='nav-item' href="support.php">Support</a>
                <?php if(!empty($_SESSION['UserName'])) { ?>
                <a class='nav-item' href="account.php">Account</a>
                <?php } else {?>
                <a class='nav-item' href="login.php">Login</a>
                <?php } ?>
            </div>
            <div id='nav-right'></div>
        </div>

        <div id='facebook'>
            <iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2FFootballPlaybookOnline%2F&amp;width=450&amp;height=80&amp;colorscheme=light&amp;layout=standard&amp;action=like&amp;show_faces=false&amp;send=true" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:450px; height:80px;margin-top:5px;" allowTransparency="true"></iframe>
        </div>
        <div id='status'><?php
            if(!empty($_SESSION['UserName'])) {                    
                $userName = $_SESSION['UserName'];
                echo "Welcome: $userName. <a href='#' target='_parent' onclick='confirmLogout()'>Logout</a>";
            } else {
                echo "Welcome: Guest";
            }
            ?>
        </div>
    </div><!-- header-->
    <?php } ?>   
</body>
</html>  