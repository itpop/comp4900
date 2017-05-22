<?php
    include "top.php";
    include "global.php";

    $number1 = rand(0,9);
    $number2 = rand(0,9);
    $total = $number1 + $number2;
    $mathstr = 'What is '. $number1 . ' + ' . $number2 . '?:';
    $isMobile = checkMobile();
?>
<html>
<head>
    <!-- STYLES -->
    <link rel="stylesheet" type="text/css" href="css/login.css" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <!-- SCRIPTS -->
    <script language="JavaScript" type="text/javascript">
        var current_header = false;
        //check email availability
        $(document).ready(function() {
            $("#username").on('change keyup paste', function () {
               var uname = $(this).val();
               if(uname.length > 2) {
                   $.post('registerCheck.php', {'username':uname}, function(data) {
                   $("#userResult").html(data); //display the availability
                   });
               }
            });
        });

        function shrinkHeader(mode)
        {
            document.cookie = "upshrink=" + (mode ? 1 : 0);
            document.getElementById("upshrink").src = (mode ? "img/upshrink2.gif" : "img/upshrink.gif");

            document.getElementById("upshrinkHeader").style.display = mode ? "none" : "";
            document.getElementById("upshrinkHeader2").style.display = mode ? "none" : "";

            current_header = mode;
        }
        
        //validate password
        function validatePasswd() {
            var pwd = $('#passwd').val();
            if (pwd.length < 3) {
                $('#errPasswd').html('<span class=error>Password must meet complexity requirements.</span>');
                return false;
            } else {
                $('#errPasswd').val('');
                return true;
            }           
        }

        //validate retype password
        function validatePasswd1() {
            var pwd = $('#passwd').val();
            var pwd1 = $('#passwd1').val();
            if (pwd != pwd1) {
                $('#errPasswd1').html('<span class=error>Passwords not matched.</span>');
                return false;
            } else {
                $('#errPasswd1').val('');
                return true;
            }
        }

        //validate math
        function validateMath() {
           var guess = $('#math').val();
           var answer = $('#total').val();
           if (guess != answer) {
                $('#errMath').html('<span class=error>The answer is incorrect.</span>');
                return false;
            } else {
                $('#errMath').val('');
                return true;
            }
        }

        //validate form
        function validateForm() {
            var result = validatePasswd();
            if (result) result = validatePasswd1();
            if (result) result = validateMath();
            return result;
        }

    </script>   
</head>
<body>
    <div class="container text-center" id="mainWrapper">
    <div id="wrapper-main">
    <?php include "header.php"; ?>
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
                </td>
                
                <td valign="top" class="maintab_back">
                    <a href="login.php">Login</a>
                </td>
                <td class="maintab_active_first">&nbsp;</td>
                <td valign="top" class="maintab_active_back">
                    <a href="register.php">Register</a>
                </td>
                <td class="maintab_active_last">&nbsp;&nbsp;&nbsp;</td>
                
            </tr>
        </table>
    </div>
    <div id="bodyarea" style="padding: 0px 0px 0px 0px;">
        <form action="registerDo.php" method="post" name="regForm" id="regForm" style="margin-top: 4ex;" 
            onsubmit="return validateForm()">
            <table border="0" width="400" cellspacing="0" cellpadding="4" class="tborder tinytext">
                <tr class="titlebg">
                    <td colspan="2" class="tdstyle">
                        Register - Required Information
                    </td>
                </tr>
                <tr class="windowbg">
                    <td width="45%" class="tdstyle"><b>Choose username:</b>
                    <?php if (!$isMobile) {?>
                    <br><span class='regtitle'>Used only for identification by SMF.</span>
                    <?php } ?>
                    </td>
                    <td class="tdstyle"><input type="text" id="username" name="username" size="18" value="" required />
                    <span id="userResult" /></td>
                </tr>
                <tr class="windowbg">
                    <td class="tdstyle"><b>Email:</b>
                    <?php if (!$isMobile) {?>
                    <br><span class='regtitle'>This must be a valid email address.</span>
                    <?php } ?>
                    </td>
                    <td class="tdstyle"><input type="email" id="email" name="email" size="18" value="" required /></td>
                </tr>
                <tr class="windowbg">
                    <td class="tdstyle"><b>Choose password:</b>
                    <?php if (!$isMobile) {?>
                    <br><span class='regtitle'>At least 8 characters, at least 1 upper letter and 1 number. </span>
                    <?php } ?>
                    </td>
                    <td class="tdstyle"><input type="password" id="passwd" name="passwd" size="18" value="" required />
                    <span id="errPasswd" /></td>
                </tr>
                <tr class="windowbg">
                    <td class="tdstyle"><b>Verify password:</b></td>
                    <td class="tdstyle"><input type="password" id="passwd1" name="passwd1" size="18" value="" required />
                    <span id="errPasswd1" /></td>
                </tr>
                <tr class="windowbg">
                    <td class="tdstyle"><b><?php echo $mathstr; ?></b></td>
                    <td class="tdstyle"><input type="text" id="math" name="math" size="18" value="" required />
                    <span id="errMath" /></td></td>
                </tr>
                <?php if (!$isMobile) {?>
                <tr class="windowbg">
                    <td class="tdstyle"><b>Visual verification:</b>
                    <br><span class='regtitle'>Type the letters shown in the picture.</span>
                    </td>
                    <td class="tdstyle">
                        <!-- Replace data-sitekey with your own one, generated at https://www.google.com/recaptcha/admin -->
                        <div class="g-recaptcha" data-sitekey="6Le9tSAUAAAAAMEUd3nLOxQ5s1o4Bs0X276g6zqU"></div>
                    </td>
                </tr>
                <?php } ?>
            </table>
            <div style="display:none;">
                <input type="text" id="total" value="<?php echo $total; ?>" />
            </div>
            <div class="rule tinytext">
                    <p>You agree, through your use of this forum, that you will not post any material which is false, defamatory, inaccurate, abusive, vulgar, hateful, harassing, obscene, profane, sexually oriented, threatening, invasive of a person's privacy, adult material, or otherwise in violation of any International or United States Federal law. You also agree not to post any copyrighted material unless you own the copyright or you have written consent from the owner of the copyrighted material. Spam, flooding, advertisements, chain letters, pyramid schemes, and solicitations are also forbidden on this forum.</p>

                    <p>Note that it is impossible for the staff or the owners of this forum to confirm the validity of posts. Please remember that we do not actively monitor the posted messages, and as such, are not responsible for the content contained within. We do not warrant the accuracy, completeness, or usefulness of any information presented. The posted messages express the views of the author, and not necessarily the views of this forum, its staff, its subsidiaries, or this forum's owner. Anyone who feels that a posted message is objectionable is encouraged to notify an administrator or moderator of this forum immediately. The staff and the owner of this forum reserve the right to remove objectionable content, within a reasonable time frame, if they determine that removal is necessary. This is a manual process, however, please realize that they may not be able to remove or edit particular messages immediately. This policy applies to member profile information as well. </p>

                    <p>You remain solely responsible for the content of your posted messages. Furthermore, you agree to indemnify and hold harmless the owners of this forum, any related websites to this forum, its staff, and its subsidiaries. The owners of this forum also reserve the right to reveal your identity (or any other related information collected on this service) in the event of a formal complaint or legal action arising from any situation caused by your use of this forum. </p>

                    <p>You have the ability, as you register, to choose your username. We advise that you keep the name appropriate. With this user account you are about to register, you agree to never give your password out to another person except an administrator, for your protection and for validity reasons. You also agree to NEVER use another person's account for any reason.  We also HIGHLY recommend you use a complex and unique password for your account, to prevent account theft.</p>

                    <p>After you register and login to this forum, you will be able to fill out a detailed profile. It is your responsibility to present clean and accurate information. Any information the forum owner or staff determines to be inaccurate or vulgar in nature will be removed, with or without prior notice. Appropriate sanctions may be applicable.</p>

                    <p>Please note that with each post, your IP address is recorded, in the event that you need to be banned from this forum or your ISP contacted. This will only happen in the event of a major violation of this agreement.</p>

                    <p>Also note that the software places a cookie, a text file containing bits of information (such as your username and password), in your browser's cache. This is ONLY used to keep you logged in/out. The software does not collect or send any other form of information to your computer.
                    </p>
                
                    <div class="login-group-checkbox">
                        <input type="checkbox" id="agree" name="agree" checked required>
                        <label for="agree">&nbsp;I Agree</label>
                    </div>
                </div>
                <div class="regbtn1">
                    <button type="submit" class="normalbtn btn-primary">Register</button>
                </div>
        </form>       
    </div>    
    </div>
    </div>
    <?php include "footer.php"; ?>
</body>
</html>