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
    <!-- KNOCKOUT -->
    <script src="http://knockoutjs.com/downloads/knockout-3.4.2.js"></script>
    <!-- FABRIC -->
    <script src = "js/fabric.js"></script>
    <!-- COLOUR PICKER LIBRARY FOR BOOTSTRAP -->
    <script src = "js/bootstrap-colorpicker.min.js"></script>
    <!-- OUR SCRIPT -->
    <script type="text/javascript" src="js/global.js"></script>
    <script type="text/javascript" src="js/design.js"></script>
    <!-- STYLES -->
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" href="css/bootstrap-colorpicker.min.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/base.css" />
    <link rel="stylesheet" type="text/css" href="css/design.css" />
</head>
<body>
<div class="container text-center" id="mainWrapper">    
    <?php include "header.php"; ?>
    <div class="container">
    <!-- Modal -->
    <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">New Play</h4>
        </div>
        <div class="modal-body">
            <div id="defensePlays">
                <h3>Defense</h3>
                <div id="defensePlaysCarousel" class="carousel slide" data-ride="carousel" data-interval="false">

                    <!-- Wrapper for slides -->
                    <div class="carousel-inner" data-bind = " foreach : {data: defensePremiumArray, as: 'defense' }" role="listbox">
                    <div class="carousel-item" data-bind="css : { active:  defense.classActive}">
                        <img class="modalImg" data-bind="attr : {src: defense.thumbnail}" alt="3-4">
                        <div>
                            <h4 class="carousel-playname" data-bind="text: defense.playname"></h4>
                        </div>
                    </div>
                    </div>

                    <!-- Left and right controls -->
                    <a class="carousel-item-left carousel-control-left" href="#defensePlaysCarousel" role="button" data-slide="prev">
                    <span class="fa fa-chevron-left fa-lg" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a class="carousel-item-right carousel-control-right" href="#defensePlaysCarousel" role="button" data-slide="next">
                    <span class="fa fa-chevron-right fa-lg" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div>
            </div><!--defensePlays end-->
            
            <div id="offensePlays">
                <h3>Offense</h3>
                
                <div id="offensePlaysCarousel" class="carousel slide" data-ride="carousel" data-interval="false">
                  
                  <!-- Wrapper for slides -->
                  <div class="carousel-inner" data-bind = " foreach : {data: offensePremiumArray, as: 'offense' }" role="listbox">
                    <div class="carousel-item" data-bind="css : { active:  offense.classActive}">
                      <img class="modalImg" data-bind="attr : {src: offense.thumbnail}" alt="Blank">
                      <div>
                        <h4 class="carousel-playname" data-bind="text: offense.playname"></h4>
                      </div>
                    </div>
                  </div>

                  <!-- Left and right controls -->
                  <a class="carousel-item-left carousel-control" href="#offensePlaysCarousel" role="button" data-slide="prev">
                    <span class="fa fa-chevron-left fa-lg" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a class="carousel-item-right carousel-control" href="#offensePlaysCarousel" role="button" data-slide="next">
                    <span class="fa fa-chevron-right fa-lg" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div>
            </div><!--offensePlays end-->
        </div><!--modal-body end-->
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-default" data-dismiss="modal" id="loadPlay">Continue</button>
        </div>
      </div><!--modal-content end-->
      
    </div><!--modal-dialog end-->
  </div><!--modal end-->
  
    <!-- div contains buttons -->
    <div class="row">
        <div class="col-xl-12">
          <!-- Trigger the modal with a button -->
          <button class="btn toolbtn" data-toggle="modal" data-target="#myModal">New Play</button>
            <button class="btn toolbtn" id = "clearCanvasBtn">
                Clear
            </button>
        </div>
    </div>
        <!-- div contains shapes -->
    <div class="row">
        <div class="col-xl-12" id="toolbar">
            <button class="btn toolbtn" id = "selectBtn">
                <img id="cursor" src="img/cursor.png" class="shapebtn" />
            </button>
            <button class="btn toolbtn" id = "lineBtn">
                <img id="line" src="img/line_black.png" class="shapebtn" />
            </button>
            <button class = "btn toolbtn" id = "dashLine">
                <img id = "dl" src = "img/line_black_dashed.png" class = "shapeBtn" />
            </button>
            <button class="btn toolbtn" id = "cLineBtn">
                <img id="cline" src="img/cline_black.png" class="shapebtn" />
            </button>
            <button class="btn toolbtn" id="circleBtn">
                <img id="o" src="img/o_black.png" class="shapebtn" />
            </button>
            <button class="btn toolbtn" id="crossBtn">
                <img id="x" src="img/x_black.png" class="shapebtn" />
            </button>
            <button class="btn toolbtn" id="rectBtn">
                <img id="sq" src="img/square.png" class="shapebtn" />
            </button>
            <button class="btn toolbtn" id="triangleBtn">
                <img id="tr" src="img/triangle.png" class="shapebtn" />
            </button>
            <button class = "btn toolbtn" id = "ovalBtn">
                <img id = "ov" src = "img/oval.png" class = "shapeBtn" />
            </button>
            <button class = "btn toolbtn" id = "textBtn">
                <img id = "tb" src = "img/text.png" class = "shapeBtn" />
            </button>
        </div>
    </div>
    <div class="row">
        <div class="col-xl-12">
            <label><input type = "checkbox" value = "SnapGrid" id = "SnapGridCheck"/>Snap To Grid</label>
            <label><input type = "checkbox" value = "CLCVisible" id ="CLCVisibleCheck" checked="checked"/>Curve Line Handles Visibility</label>
        </div>
    </div>
    <div class="row">
        <!-- div contains canvas -->
        <div class="col-xl-11 col-lg-11 col-md-11 col-sm-12 col-xs-12" id = "canvasWrapper">
            <!-- canvas size -->
            <canvas id="canvas"></canvas>
        </div>
        <!-- div contains colours -->
        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-xs-12" id = "coloursDiv">
            <button class="btn colorbtn" id = "yellowBtn">
                <span class="fa fa-tint fa-2x yellow"></span>
            </button>
            <button class="btn colorbtn" id = "whiteBtn">
                <span class="fa fa-tint fa-2x white"></span>
            </button>
            <button class="btn colorbtn" id = "grayBtn">
                <span class="fa fa-tint fa-2x gray"></span>
            </button>
            <button class="btn colorbtn" id = "blueBtn">
                <span class="fa fa-tint fa-2x blue"></span>
            </button>
            <button class="btn colorbtn" id = "redBtn">
                <span class="fa fa-tint fa-2x red"></span>
            </button>
            <button class="btn colorpicker-component colorbtn" id = "customBtn">
                <span class="fa fa-tint fa-2x" id = "ColourPalleteBtn" value="#ffffff"></span>
            </button>
        </div>
    </div>
    <div class="row">
        <div class="col-xl-6">
            <div class="form-group">
                <label for="playInfo">Play Info</label>
                <textarea class="form-control" id="playInfo" rows="3" placeholder=""></textarea>
            </div>
        </div>
        <div class="col-xl-3">
            <div class="form-group">
                <label for="playName">Play Name</label>
                <input type="text" class="form-control" id="playName" rows="3" placeholder=""></input>
            </div>
        </div>
        <div class="col-xl-2">
            <div id="msgSave" class="msg"></div>
            <button class="btn toolbtn" data-toggle="collapse" data-target="#canvasPNGImg" id = "canvasPng">
                Save
            </button>
        </div>
    </div>
    <!-- div contains saved image -->
    <div class="col-xs-12 collapse" id="canvasPNGImg">
        Generated PNG:
        <div class="col-xs-12">
            <img id="canvasImgSaved">
        </div>
        <br/> *Click save again to collapse
    </div>
    </div>
</div>
<?php include "footer.php"; ?>
</body>
</html>