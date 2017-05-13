<html>
<head>
    <title>Football Playbook Online</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- STYLES -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/base.css">
    <link rel="stylesheet" type="text/css" href="css/carousel.css" />
    <link rel="stylesheet" type="text/css" href="css/qstyle.css" />
    <!-- JQUERY -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <!-- TETHER FOR BOOTSTRAP -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"></script>
    <!-- BOOTSTRAP -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery.roundabout.min.js"></script>
    <script>
        $(document).ready(function() {
            $('.roundabout').roundabout({
                autoplay: true,
                autoplayDuration: 3000,
                autoplayPauseOnHover: true
            });
        });
    </script>
</head>
<body>
    <div id="mainWrapper">
        <?php include "header.php"; ?>
        <div class="contentbase">
          <div class="contentfull"> 
            <div class="home_content">
                <ul class="roundabout">                
                    <li>
                    <div class="wrapper">
                        <h4>Basic Play Design</h4>
                        <img src="img/basicSS.png" alt="Free Football Play Designer" />
                        <table class="description middletext">
                            <tr>
                                <td>Easy to use</td>
                                <td>Drag &amp; Drop</td>
                            </tr>
                            <tr>
                                <td>Share your play</td>
                                <td>Free!</td>
                            </tr>
                        </table>                    
                    </div>
                    </li>
                    
                    <li>
                    <div class="wrapper">
                        <h4>Premium Play Design</h4>
                        <img src="img/premiumSS.png" alt="Premium Football Play Designer" />
                        <table class="description middletext">
                            <tr>
                                <td>Players labels</td>
                                <td>Multiple lines &amp; colors</td>
                            </tr>
                            <tr>
                                <td>More play templates</td>
                                <td>No advertisements</td>
                            </tr>
                        </table>
                    </div>
                    </li>
                    
                    <li>
                    <div class="wrapper">
                        <h4>Premium Playbook Design</h4>
                        <img src="img/playbookSS.png" alt="Online Playbook" />
                        <table class="description middletext">
                            <tr>
                                <td>User-friendly playbook</td>
                                <td>Access &amp; edit saved plays</td>
                            </tr>
                            <tr>
                                <td>Create PDFs</td>
                                <td>Print play &amp; playbooks</td>
                            </tr>
                        </table>
                    </div>
                    </li>
                </ul>
            </div> <!-- home-content -->
            <div id="information">
                <h4>Welcome to Football Playbook Online</h4>
                <p>Our software allows you to quickly create and share your plays and drills in multiple sports.  The easy to use, drag and drop interface is available for football. And it's free.  Design a play now!</p>
                <p> The advertisement free Premium Play Designer opens up a number of additional features such as player tables, different line types, multiple colors for lines and players, and more play templates.  Premium members also have a playbook to access and edit all of your plays in addition to creating PDFs to print play/playbooks. </p>
                <p><a href="http://footballplaybookonline.com/account.php">Access Premium Features Now!</a></p>
            </div>
        </div>
      </div>
    </div>
    <?php include "footer.php"; ?>
</body>
</html>