<?php include "top.php"; ?>
<html>
<head>
    <!-- STYLES -->
    <link rel="stylesheet" type="text/css" href="css/login.css" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script language="JavaScript" type="text/javascript">
        var current_header = false;
        function shrinkHeader(mode) {
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
            <div class="tborder contentgap" >
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
                    <table border="0" width="400" cellspacing="0" cellpadding="4" class="tborder tinytext">
                        <tr class="titlebg">
                            <td colspan="2">
                                <img src="img/login_sm.gif" alt="" align="top" /> Login
                            </td>
                        </tr>
                        <tr class="windowbg">
                            <td width="45%" align="right" class="tdstyle2"><b>Username:</b></td>                    
                            <td class="tdstyle"><input type="text" id="username" name="username" size="18" value="" required />
                            <?php if ($id > 0) { ?>
                            <span class='error'>Username and password not matched.</span>
                            <?php } ?>
                            </td>
                        </tr>
                        <tr class="windowbg">
                            <td align="right" class="tdstyle2"><b>Password:</b></td>
                            <td class="tdstyle"><input type="password" id="passwd" name="passwd" size="18" value="" required /></td>
                        </tr>
                        <tr class="windowbg">
                            <td align="right" class="tdstyle2"><b>Minutes to stay:</b></td>
                            <td class="tdstyle"><input type="text" name="cookielength" size="4" maxlength="4" value="60" /></td>
                        </tr>
                        <tr class="windowbg">
                            <td align="right" class="tdstyle2"><b>Keep logged in:</b></td>
                            <td class="tdstyle"><input type="checkbox" name="cookieneverexp" class="check" onclick="this.form.cookielength.disabled = this.checked;" /></td>
                        </tr>
                        <tr class="windowbg">
                            <td align="center" class="regbtn" colspan="2">
                                <button type="submit" class="normalbtn btn-primary">Login</button>
                            </td>
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