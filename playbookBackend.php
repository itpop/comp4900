<?php
    include "base.php";
    $playId = 0;
    $playName;
    $playInfo;
    $playbook = 'Uncategorized';
    $createdBy = 'NoName';

    // delete play
    if (!empty ($_POST['deleteId'])) {
        $deleteId = mysqli_real_escape_string($con, $_POST['deleteId']);
        mysqli_query($con, "call spPlayFullRemove('".$deleteId."')"); 
    }

    // update play
    if (!empty ($_POST['updateId'])) {
        $playbook = '';
        $playJson = '';
        $updateId = mysqli_real_escape_string($con, $_POST['updateId']);
        $playName = mysqli_real_escape_string($con, $_POST['playName']);
        $playInfo = mysqli_real_escape_string($con, $_POST['playInfo']);

        mysqli_query($con, "call spPlayFullUpdate('".$updateId."','".$playName."', '".$playInfo."', 
            '".$playJson."', '".$playbook."', '".$createdBy."')");
    }
    
    // clone play
    if (!empty ($_POST['clone'])) {  
        $playJson  = $_POST['playJson'];
        $playName  = mysqli_real_escape_string($con, $_POST['playName']);
        $playInfo  = mysqli_real_escape_string($con, $_POST['playInfo']);

        $playfullUpdate = mysqli_query($con, "call spPlayFullUpdate('".$playId."','".$playName."', '".$playInfo."', 
            '".$playJson."', '".$playbook."', '".$createdBy."')"); 

        if($playfullUpdate->num_rows > 0) {
            $row = mysqli_fetch_array($playfullUpdate);
            $playId = $row['playId'];
            echo $playId;
        }
    }
    
    // list json plays
    if (!empty ($_POST['getData']) && $_POST['getData'] == 1) {
        $result = mysqli_query ($con, "SELECT * FROM PlayFull WHERE IsValid = '1'");
        $resultArr = array ();
        while ($row = mysqli_fetch_assoc ($result))
            array_push ($resultArr, $row);
        $jsonResult = json_encode($resultArr);
        echo $jsonResult;
    }

    // list xml plays. Compatible with existing xml plays.
    if (!empty($_POST['getXMLData'])) {
        $raw = $_POST['getXMLData'];
        $json = json_encode(simplexml_load_string($raw));
        $arr = json_decode($json, TRUE);
        $jsonResult = array();
        $curve = array();
        $line = array();
        //print_r($arr); return; 

        foreach ($arr as $play) {
            foreach ($play['Player'] as $player) {
                if (isset($player['X'])) {
                    array_push ($jsonResult, array ("x1" => $player['X'], "y1" => $player['Y'], 
                        "x2" => '0', "y2" => '0', "type" => $player['Type']));
                }
            }

            if (preg_match('/Curve/', $raw)) {
                foreach ($play['Curve'] as $key => $val) {
                    if (strcmp($key, 'Style') == 0) {
                        $curve['type'] = 'C'.$val;
                    } else if (strcmp($key, 'X1') == 0 || strcmp($key, 'Y1') == 0 ||
                        strcmp($key, 'X2') == 0 || strcmp($key, 'Y2') == 0 ) {
                        $curve[strtolower($key)] = $val;
                    }
                }
                array_push ($jsonResult, $curve);
            }

            if (preg_match('/Line/', $raw)) {
                foreach ($play['Line'] as $key => $val) {
                    if (strcmp($key, 'Style') == 0) {
                        $line['type'] = 'L';
                    } else if (strcmp($key, 'X1') == 0 || strcmp($key, 'Y1') == 0 ||
                        strcmp($key, 'X2') == 0 || strcmp($key, 'Y2') == 0 ) {
                        $line[strtolower($key)] = $val;
                    }
                }
                array_push ($jsonResult, $line);
            }
        }

        echo json_encode ($jsonResult);
    }
?>
