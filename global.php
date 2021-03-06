<?php
    // put global constants and functions here.

    //show message without auto redirecting
    function showMessage($msg) {
        echo "<link rel='stylesheet' href='css/notify.css'>";
        echo "<div class='msgbox'>" . $msg . "</div>";
        //echo "<br><br><span class='msgcenter'><a href='index.php'>Home</a></span></div>";       
    }

    // Determine if the browser is mobile based.
    function checkMobile() {
    	return preg_match("/(android|phone|webos|wos)/i", $_SERVER["HTTP_USER_AGENT"]);
	}

     // Determine if the browser is iOS based.
    function checkIOS() {
        $result = preg_match("/(MSIE|Chrome|Firefox)/i", $_SERVER["HTTP_USER_AGENT"]);
        if (checkMobile() || $result) return false;
        return preg_match("/(safari|opera)/i", $_SERVER["HTTP_USER_AGENT"]);
    }

?>