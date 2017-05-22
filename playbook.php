<?php 
    include "top.php";

    if(empty($_SESSION['GroupId']) || $_SESSION['GroupId'] < 2) {
        echo "<meta http-equiv='refresh' content='0; url=premium.php' />";
        return;
    }
?>
<html>
<head>
    <!-- STYLES -->
    <link rel="stylesheet" href="css/playbook.css">
    <!-- SCRIPTS -->
    <script type="text/javascript" src="js/jsPDF-1.3.2/dist/jspdf.debug.js"></script>
    <script type="text/javascript" src = "js/playbook.js" defer="defer"></script>
</head>
<body>
    <div class="container text-center" id="mainWrapper">    
    <?php include "header.php"; ?>
    <div class="contentgap" />
    <div class="container col-10 zone" id="playTable">
        <div class= "row">
        <div class="col-12" id="playbookHeader">
            <div class="btn-group">
              <button class="btn btn-secondary btn-sm dropdown-toggle" id="playdrop" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Play
              </button>
              <div class="dropdown-menu" aria-labelledby="playdrop">
                <a class="dropdown-item" href="index.php">New</a>
                <a class="dropdown-item" data-bind = "click : editPlaybook" href="#">Edit</a>
                <button class="dropdown-item" data-bind = "click : clonePlay">Clone</button>
                <a class="dropdown-item" data-bind = "click : deletePlay">Delete</a>
              </div>
            </div>
            <div class="btn-group">
              <button class="btn btn-secondary btn-sm dropdown-toggle" id="pdfdrop" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Print to PDF
              </button>
              <div class="dropdown-menu" aria-labelledby="pdfdrop">
                <a class="dropdown-item" href="#" data-bind ="click : allPlaysPDF" data-toggle="modal" data-target="#allModal">All Plays</a>
                <a class="dropdown-item" href="#" data-bind ="click : selectedPlaysPDF" data-toggle="modal" data-target="#selModal">Selected Plays</a>
              </div>
            </div>
        </div>
        </div>
        <div class="row">
        <div class="col-xl-4 col-lg-4 col-sm-4 col-xs-12" id="playNameDate">
        <table class="table table-striped table-bordered table-sm">
            <thead class="thead-inverse">
                <th data-bind = "click : nameSort">Name</th>
                <th data-bind = "click : dateSort">Date</th>
            </thead>
            <tbody data-bind = "foreach : TableRows" class="playtext">
                <tr data-bind = "click : $root.selectPlay, style : {'background-color' : selectRow() ? '#FFD700' : ''}">
                    <td data-bind = "text: playName"></td>
                    <td data-bind = "text: dateCreated"></td>
                </tr>
            </tbody>
        </table>
        </div>
        <div class="col-xl-8 col-lg-8 col-sm-8 col-xs-12" id="playSnap">
            <h3>Play Snapshot</h3>
            <form id="playform">
                <div class="form-group row" id ="canvasWrapper" >
                    <canvas id = 'canvas'></canvas>
                </div>
                <div class="form-group row">
                    <label for="name-input" class="col-3 col-form-label-sm playtext" id="labelText2">
                        Name<span class="error">*</span></label>
                    <div class="col-9">
                        <input data-bind = "textInput: name" class="form-control form-control-sm" type="text" id="name-input" required />
                    </div>
                </div>
                <div class= "form-group row">
                    <label for="desc-input" class="col-3 col-form-label-sm playtext" id="labelText2">Details</label>
                    <div class="col-9">
                        <textarea data-bind = "textInput: desc" class="form-control form-control-sm" id="desc-input" rows="3"></textarea>
                    </div>
                </div>
                <div><span id="errName" /></div>
                <button type="submit" data-bind = "click : updatePlay" class="btn btn-success" id="updatebtn">Update</button>
            </form>
        </div>
    </div>
    </div>
 </div>
    <?php include "footer.php"; ?>
</body>
</html>