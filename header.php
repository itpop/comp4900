<html lang="en">
<head>
    <script language="JavaScript" type="text/javascript">
        function confirmLogout() {
            /*if(window.confirm("Are you sure you want to logout? All unsaved data will be lost."))
                window.open('logout.php', '_parent');*/
            window.open('logout.php', '_parent');   
        }
    </script>
</head>
<body>  
   <div class="container">
        <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <a href="index.php"><img src='img/fpo_final.png' id='logo' alt='Football Playbook Online' /></a>
            </div>
            
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 offset-md-2">
                <?php
                if(empty($_SESSION['GroupId']) || $_SESSION['GroupId'] < 2) { ?>
                <div id = "googleAd">
                    <iframe id="google_ads_frame1" name="google_ads_frame1" width="100%" height="60px" frameborder="0" src="https://googleads.g.doubleclick.net/pagead/ads?client=ca-pub-5153722221214031&amp;output=html&amp;h=60&amp;slotname=8393487324&amp;adk=3059326797&amp;adf=1347445746&amp;w=468&amp;lmt=1494611324&amp;flash=0&amp;url=http%3A%2F%2Fwww.footballplaybookonline.com%2Fcontact.php&amp;wgl=1&amp;dt=1494611324563&amp;bpp=22&amp;bdt=90&amp;fdt=28&amp;idt=118&amp;shv=r20170508&amp;cbv=r20170110&amp;saldr=sa&amp;correlator=5322998110243&amp;frm=20&amp;ga_vid=930804433.1494611303&amp;ga_sid=1494611303&amp;ga_hid=724555372&amp;ga_fc=1&amp;pv=2&amp;iag=3&amp;icsg=2&amp;nhd=1&amp;dssz=2&amp;mdo=0&amp;mso=0&amp;u_tz=-420&amp;u_his=7&amp;u_java=0&amp;u_h=1366&amp;u_w=1024&amp;u_ah=1366&amp;u_aw=1024&amp;u_cd=24&amp;u_nplug=0&amp;u_nmime=0&amp;adx=502&amp;ady=25&amp;biw=1024&amp;bih=1366&amp;eid=575144605%2C389613000%2C389613002&amp;oid=3&amp;ref=http%3A%2F%2Fwww.footballplaybookonline.com%2Findex.php&amp;rx=0&amp;eae=0&amp;fc=16&amp;brdim=0%2C0%2C0%2C0%2C1024%2C0%2C1024%2C1366%2C1024%2C1366&amp;vis=1&amp;rsz=%7C%7CleE%7C&amp;abl=CS&amp;ppjl=f&amp;pfx=0&amp;fu=1040&amp;bc=1&amp;ifi=1&amp;xpc=KWzZSYwuNN&amp;p=http%3A//www.footballplaybookonline.com&amp;dtd=161" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no" allowfullscreen="true"></iframe>
                </div>
                <?php } ?>
                <div id="status">
                    <?php
                        if(!empty($_SESSION['UserName'])) {                    
                            $userName = $_SESSION['UserName'];
                            echo "Welcome: $userName. <a href='#' target='_parent' onclick='confirmLogout()'>Logout</a>";
                        } else {
                            echo "Welcome: Guest";
                        }
                    ?>
                </div>
            </div>            
        </div>
            
        <div class="row2">
            <div id="facebook">
                    <iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2FFootballPlaybookOnline%2F&amp;colorscheme=light&amp;layout=standard&amp;action=like&amp;show_faces=false&amp;send=true" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100%; height:100%;margin-top:3px;" allowTransparency="true"></iframe>
            </div>            
        </div>
    </div>
    
</body>
</html>  