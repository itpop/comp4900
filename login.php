<html>
<head>
    <title>Football Playbook Online</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- JQUERY -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <!-- TETHER FOR BOOTSTRAP -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"></script>
    <!-- BOOTSTRAP -->
    <script src="js/bootstrap.min.js"></script>
    <!-- STYLES -->
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" href="css/bootstrap-colorpicker.min.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/base.css" />
    <link rel="stylesheet" type="text/css" href="css/login.css" /> 
    <script language="JavaScript" type="text/javascript">
        var current_header = false;
        function shrinkHeader(mode)
        {
            document.cookie = "upshrink=" + (mode ? 1 : 0);
            document.getElementById("upshrink").src = (mode ? "img/upshrink2.gif" : "img/upshrink.gif");

            document.getElementById("upshrinkHeader").style.display = mode ? "none" : "";
            document.getElementById("upshrinkHeader2").style.display = mode ? "none" : "";

            current_header = mode;
        }
    </script>   
</head>
<body>
    <div class="container text-center" id="mainWrapper">
    <div id="wrapper-main">
    <?php include "header.php"; ?>
    <?php 
        $id = 0;
        if(isset($_GET["id"])) {
            $id = $_GET["id"];
        }
    ?>
    <div class="tborder" >
        <table width="100%" cellpadding="0" cellspacing="0" border="0" >
            <tr>
                <td class="titlebg2" height="32" align="right">
                    <span class="smalltext"><?php echo date("Y-m-d h:i:sa")?></span>
                    <a href="#" onclick="shrinkHeader(!current_header); return false;"><img id="upshrink" src="img/upshrink.gif" alt="*" title="Shrink or expand the header." align="bottom" style="margin: 0 1ex;" /></a>
                </td>
            </tr>
        </table>        
        <table cellpadding="0" cellspacing="0" border="0" style="margin-left: 10px;">
            <tr>
                <td class="maintab_first">&nbsp;</td>
                <td valign="top" class="maintab_back">
                    <a href="index.php">Home</a>
                </td>
                <td valign="top" class="maintab_back">
                    <a href="#">Help</a>
                </td><td class="maintab_active_first">&nbsp;</td>
                <td valign="top" class="maintab_active_back">
                    <a href="login.php">Login</a>
                </td><td class="maintab_active_last">&nbsp;</td>
                <td valign="top" class="maintab_back">
                    <a href="register.php">Register</a>
                </td>
                <td class="maintab_last">&nbsp;</td>
            </tr>
        </table>
    </div>
    <div id="bodyarea" style="padding: 0px 0px 0px 0px;">
        <form action="loginDo.php" method="post" name="loginForm" id="loginForm" style="margin-top: 4ex;">
            <table border="0" width="400" cellspacing="0" cellpadding="4" class="tborder tinytext" align="center">
                <tr class="titlebg">
                    <td colspan="2">
                        <img src="img/login_sm.gif" alt="" align="top" /> Login
                    </td>
                </tr>
                <tr class="windowbg">
                    <td width="50%" align="right"><b>Username:</b></td>                    
                    <td><input type="text" id="username" name="username" size="20" value="" required />
                    <?php if ($id > 0) { ?>
                    <span class='error'>Username and password not matched.</span>
                    <?php } ?>
                    </td>
                </tr>
                <tr class="windowbg">
                    <td align="right"><b>Password:</b></td>
                    <td><input type="password" id="passwd" name="passwd" value="" size="20" required /></td>
                </tr>
                <tr class="windowbg">
                    <td align="right"><b>Minutes to stay logged in:</b></td>
                    <td><input type="text" name="cookielength" size="4" maxlength="4" value="60" /></td>
                </tr>
                <tr class="windowbg">
                    <td align="right"><b>Always stay logged in:</b></td>
                    <td><input type="checkbox" name="cookieneverexp" class="check" onclick="this.form.cookielength.disabled = this.checked;" /></td>
                </tr>
                <tr class="windowbg">
                    <td align="center" colspan="2"><input type="submit" value="Login" style="margin-top: 2ex;" /></td>
                </tr>
                <tr class="windowbg">
                    <td align="center" colspan="2" class="smalltext"><a href="http://www.footballplaybookonline.com/forum/index.php?action=reminder">Forgot your password?</a><br /><br /></td>
                </tr>
            </table>
        </form>        
    </div>
    </div>
    </div>
    <?php include "footer.php"; ?>
</body>
</html>