<?php
    include "base.php";
    $playId = 0;
    $playbook = 'Uncategorized';
    $createdBy = 'NoName';
    
    if (!empty($_POST['playName']) && !empty($_POST['playInfo']) && !empty($_POST['playJson'])) { // save to db
        $playJson = $_POST['playJson']; 
        $playName = mysqli_real_escape_string($con, $_POST['playName']);
        $playInfo = mysqli_real_escape_string($con, $_POST['playInfo']);

        if (!empty ($_POST['playId'])) {
            $playId = mysqli_real_escape_string($con, $_POST['playId']);
        }

        mysqli_query($con, "call spPlayFullUpdate('".$playId."','".$playName."', '".$playInfo."', 
            '".$playJson."', '".$playbook."', '".$createdBy."')"); 

    } else if (!empty($_POST['defence']) && !empty($_POST['offence'])) { // preload patterns from xml files
        $def = file_get_contents ($_POST['defence'], FILE_USE_INCLUDE_PATH);
        $xml = simplexml_load_string($def);
        $json = json_encode($xml);
        $array = json_decode($json, TRUE);
        $jsonResult = array ();

        if (strcmp($_POST['defence'], 'xml/none.xml') !== 0) {
            foreach ($array as $play)
                foreach ($play['Player'] as $player)
                   array_push ($jsonResult, array ("x" => $player['X'], "y" => $player['Y'], "type" => $player['Type']));
        }

        $off = file_get_contents ($_POST['offence'], FILE_USE_INCLUDE_PATH);
        $xml = simplexml_load_string($off);
        $json = json_encode($xml);
        $array = json_decode($json, TRUE);

        if (strcmp($_POST['offence'], 'xml/none.xml') !== 0) {
            foreach ($array as $play)
                foreach ($play['Player'] as $player)
                   array_push ($jsonResult, array ("x" => $player['X'], "y" => $player['Y'], "type" => $player['Type']));
        }
        
        echo json_encode ($jsonResult);
    }   
?>